"use client";

import { Button } from "./ui/button";
import { PaginationProps } from "@/typings";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination(props: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleNextClick() {
    if (!props.cursor) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("direction", "after");
    params.set("cursor", props.cursor);
    router.push(`${pathname}?${params}`);
  }

  return (
    <Button className="m-auto" onClick={handleNextClick}>
      Next
    </Button>
  );
}
