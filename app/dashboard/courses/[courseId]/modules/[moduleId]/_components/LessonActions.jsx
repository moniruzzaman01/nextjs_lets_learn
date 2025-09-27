"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteALesson, updateALesson } from "@/app/action/lesson-action";

export default function LessonActions({
  isPublished = false,
  lessonId,
  moduleId,
  setLesson = () => {},
}) {
  const router = useRouter();
  const handlePublish = async () => {
    try {
      await updateALesson(lessonId, { isPublished: !isPublished });
      toast.success(
        `Lesson ${isPublished ? "Unpublished" : "Published"} successfully!!!`
      );
      setLesson((prev) => {
        return { ...prev, isPublished: !isPublished };
      });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await deleteALesson(lessonId, moduleId);
      if (response.success) toast.success("Lesson deleted successfully!!!");
      else toast.error("Lesson not found, Plese refresh the page!!!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={handlePublish} variant="outline" size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <div className="relative group">
        <Button onClick={handleDelete} size="sm" disabled={isPublished}>
          <Trash className="h-4 w-4" />
        </Button>

        {isPublished && (
          <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none top-full mt-2 py-1 w-[15vw] rounded right-0 bg-slate-100 duration-200 transition-opacity text-xs text-center">
            Please unpublish the lession before delete
          </div>
        )}
      </div>
    </div>
  );
}
