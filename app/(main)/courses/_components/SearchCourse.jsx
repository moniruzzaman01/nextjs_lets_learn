"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchCourse() {
  const router = useRouter();
  const searchRef = useRef();
  const searchParams = useSearchParams();
  const searchText = searchParams.get("searchText");

  const handleSearch = () => {
    const searchValue = searchRef.current.value;
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set("searchText", searchValue);
    } else {
      params.delete("searchText");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative h-10 max-lg:w-full">
      <Search className="absolute left-3 top-[18px] transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
      <Input
        ref={searchRef}
        type="text"
        defaultValue={searchText}
        onChange={handleSearch}
        placeholder="Search courses..."
        className="pl-8 pr-3 py-2 text-sm"
      />
    </div>
  );
}
