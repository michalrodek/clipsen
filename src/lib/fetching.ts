import { TwitchApiResponse, StreamData, ClipData } from "@/typings";

const options = {
  headers: {
    Authorization: `Bearer ${process.env.BEARER}`,
    "Client-Id": `${process.env.CLIENT_ID}`,
  },
  next: {
    revalidate: 3600,
  },
};

async function _fetch(url: string) {
  try {
    const resp = await fetch(url, options);

    if (!resp.ok) {
      return undefined;
    }

    return await resp.json();
  } catch (error) {
    return undefined;
  }
}

export async function getUser(
  name: string
): Promise<TwitchApiResponse<StreamData> | undefined> {
  return _fetch(`https://api.twitch.tv/helix/users/?login=${name}`);
}

export async function getClips(
  id: string,
  startedAt: Date | undefined,
  cursor: string,
): Promise<TwitchApiResponse<ClipData> | undefined> {
  let url = `https://api.twitch.tv/helix/clips?broadcaster_id=${id}`;

  if (startedAt) {
    url += `&started_at=${startedAt.toISOString()}`;
  }

  if (cursor) {
    url += `&after=${cursor}`;
  }
  console.log(url);
  return _fetch(url);
}
