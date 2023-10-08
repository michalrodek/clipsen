"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Range } from "@/typings";
import { useEffect, useState } from "react";

export default function ButtonList() {
  const router = useRouter();
  const params = useSearchParams();
  const [range, setRange] = useState(Range.day);

  useEffect(() => {
    const param = params.get("range");

    if (param) {
      setRange(param as Range);
    } else {
      setRange(Range.day);
    }
  }, [params]);

  function handleClick(value: Range) {
    router.push(`?range=${value}`);
    router.refresh();
  }

  return (
    <div className="flex gap-4 self-end">
      <Select
        value={range}
        onValueChange={(value: Range) => handleClick(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="24 hours" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Range.day}>24 hours</SelectItem>
          <SelectItem value={Range.week}>7 days</SelectItem>
          <SelectItem value={Range.month}>30 days</SelectItem>
          <SelectItem value={Range.all}>all</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
