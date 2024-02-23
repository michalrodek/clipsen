import { TwitchApiResponse, StreamData, ClipData } from "@/typings";
import { kv } from "@vercel/kv";

const ACCESS_TOKEN = "access_token";

async function getFetchOptions() {
  return {
    headers: {
      Authorization: `Bearer ${await kv.get(ACCESS_TOKEN)}`,
      "Client-Id": `${process.env.CLIENT_ID}`,
    },
    next: {
      revalidate: 3600,
    },
  };
}

async function _fetch(url: string, options: any) {
  try {
    const resp = await fetch(url, options);

    if (!resp.ok) {
      const error = await resp.json();

      if (error.message === "Invalid OAuth token") {
        await generateAccessToken();

        return await _fetch(url, await getFetchOptions());
      }

      return undefined;
    }

    return await resp.json();
  } catch (error) {
    return undefined;
  }
}

async function generateAccessToken() {
  const resp = await _fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });

  await kv.set(ACCESS_TOKEN, resp.access_token);
}

export async function getUser(
  name: string
): Promise<TwitchApiResponse<StreamData> | undefined> {
  return await _fetch(
    `https://api.twitch.tv/helix/users/?login=${name}`,
    await getFetchOptions()
  );
}

export async function getClips(
  id: string,
  startedAt: Date | undefined,
  cursor: string
): Promise<TwitchApiResponse<ClipData> | undefined> {
  let url = `https://api.twitch.tv/helix/clips?broadcaster_id=${id}`;

  if (startedAt) {
    url += `&started_at=${startedAt.toISOString()}`;
  }

  if (cursor) {
    url += `&after=${cursor}`;
  }

  return await _fetch(url, await getFetchOptions());
}
