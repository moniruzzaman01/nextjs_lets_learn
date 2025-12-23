import { cn } from "@/lib/utils";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import Link from "next/link";

export default function Lesson({ lesson }) {
  return (
    <Link
      href={
        lesson.isPublic ? `?lesson=${lesson.slug}` : "?reason=private-lesson"
      }
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-600 text-sm font-[500] transition-all hover:text-slate-700 ",
        lesson.state == "completed" &&
          "text-emerald-700  hover:text-emerald-800",
        !lesson.isPublic && "text-slate-400  hover:text-slate-500"
      )}
    >
      {!lesson.isPublic ? (
        <Lock size={16} />
      ) : lesson.state == "completed" ? (
        <CheckCircle size={16} />
      ) : (
        <PlayCircle size={16} />
      )}
      {lesson.title}
    </Link>
  );
}
