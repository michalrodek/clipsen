import { Card, CardHeader, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import Eye from "./icons/eye";
import { CardListProps, Range, StreamData, TwitchApiResponse } from "@/typings";
import { getClips, getUser } from "@/lib/fetching";
import Pagination from "./pagination";

function getDateRange(range: number) {
  return new Date(
    new Date(Date.now()).setHours(new Date(Date.now()).getHours() - 24 * range)
  );
}

function getStartedAt(range: string) {
  switch (range) {
    case Range.week:
      return getDateRange(7);
    case Range.month:
      return getDateRange(30);
    case Range.all:
      return undefined;
    default:
      return getDateRange(1);
  }
}

export default async function CardList(props: CardListProps) {
  const startedAt = getStartedAt(props.range);
  let stream: TwitchApiResponse<StreamData> | undefined;

  if (props.name) {
    stream = await getUser(props.name);
  }

  const id = stream?.data?.[0]?.id ?? "22484632";
  const clips = await getClips(id, startedAt, props.cursor);

  return (
    <>
      {clips?.data.map((clip) => {
        const views = Intl.NumberFormat("en", { notation: "compact" }).format(
          clip.view_count
        );

        return (
          <Link key={clip.id} href={clip.url} target="_blank">
            <Card>
              <CardHeader>
                <Image
                  alt={clip.title}
                  src={clip.thumbnail_url}
                  width="600"
                  height="300"
                />
              </CardHeader>
              <CardContent className="flex justify-between">
                <p>{clip.title}</p>
                <span className="flex gap-2">
                  <Eye /> {views}
                </span>
              </CardContent>
            </Card>
          </Link>
        );
      })}
      <Pagination cursor={clips?.pagination?.cursor} />
    </>
  );
}
