"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
const sort_options = [
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

export default function SortCourse() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSort = searchParams.get("sort");

  const applyArrayFilter = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select
      key={selectedSort ?? "no-sort"}
      value={selectedSort || undefined}
      onValueChange={(value) => applyArrayFilter(value)}
    >
      <SelectTrigger className="w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0  overflow-hidden">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sort_options.map((option) => (
            <SelectItem
              className="cursor-pointer"
              key={option?.value}
              value={option?.value}
            >
              {option?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
