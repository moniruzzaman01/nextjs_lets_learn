"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CourseActions({ isPublished = false }) {
  return (
    <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Button size="sm" disabled={true}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
