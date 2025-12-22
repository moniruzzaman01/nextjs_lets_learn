"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";

export function ServerToast() {
  const params = useSearchParams();
  const reason = params.get("reason");

  useEffect(() => {
    if (reason === "not-enrolled") {
      toast.error("You haven't enrolled in this course!!!");
    } else if (reason === "private-lesson") {
      toast.error("This lesson is private!!!");
    }
  }, [reason]);

  return <Toaster richColors />;
}
