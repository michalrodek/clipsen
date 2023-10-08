export enum Range {
  "day" = "24hr",
  "week" = "7d",
  "month" = "30d",
  "all" = "all",
}

export interface PageProps<T, U> {
  params: T;
  searchParams: U;
}

export interface TwitchApiResponse<T> {
  data: T[];
  pagination?: { cursor: string };
}

export interface StreamData {
  id: string;
}

export interface ClipData {
  embed_url: string;
  id: string;
  thumbnail_url: string;
  title: string;
  url: string;
  video_id: string;
  view_count: number;
}

export interface CardListProps {
  name: string;
  range: string;
  cursor: string;
}

export interface PaginationProps {
  cursor: string | undefined;
}
