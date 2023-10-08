import { Card, CardHeader, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard() {
  return Array.from(Array(10).keys()).map((card, i) => (
    <Card key={i}>
      <CardHeader>
        <Skeleton className="aspect-video rounded" />
      </CardHeader>
      <CardContent className="flex justify-between">
        <Skeleton className="w-32 h-6 rounded" />
        <Skeleton className="w-12 h-6 rounded" />
      </CardContent>
    </Card>
  ));
}
