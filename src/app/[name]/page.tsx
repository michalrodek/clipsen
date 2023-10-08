import CardList from "@/components/card-list";
import SkeletonCard from "@/components/skeleton-card";
import { PageProps } from "@/typings";
import { Suspense } from "react";

export default function Page(
  props: PageProps<
    { name: string },
    { range: string; cursor: string; direction: string }
  >
) {
  return (
    <Suspense fallback={<SkeletonCard />}>
      <CardList
        name={props.params.name}
        range={props.searchParams.range}
        cursor={props.searchParams.cursor}
      />
    </Suspense>
  );
}
