"use client";

import { Button } from "@/components/ui/button";

export default function SelectedFilters({ selectedCategories = [] }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {selectedCategories.length > 0 &&
        selectedCategories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
          >
            {category}
          </Button>
        ))}
    </div>
  );
}
