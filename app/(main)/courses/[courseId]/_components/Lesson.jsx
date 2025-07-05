import { cn } from "@/lib/utils";
import { getALessonById } from "@/queries/lesson-queries";
import { Tv } from "lucide-react";

export default async function Lesson({ lessonId }) {
  const lesson = await getALessonById(lessonId);

  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tv size={16} className={cn("text-slate-500")} />
        {lesson?.title}
      </div>
    </button>
  );
}
