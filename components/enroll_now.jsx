"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { createCheckoutSession } from "@/app/action/stripe";

export default function EnrollNow({ isButton, course }) {
  const { title, id, price } = course || {};
  const enrollAction = async (data) => {
    const { url } = await createCheckoutSession(data);
    window.location.assign(url);
  };

  return (
    <>
      <form action={enrollAction}>
        <input type="hidden" name="courseId" value={id} />
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="price" value={price} />
        {isButton ? (
          <Button type="Submit" className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        ) : (
          <Button
            type="Submit"
            variant="ghost"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        )}
      </form>
    </>
  );
}
