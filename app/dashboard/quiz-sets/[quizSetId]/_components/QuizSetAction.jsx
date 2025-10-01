"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteAQuizset, updateAQuizset } from "@/app/action/quiz-action";

export const QuizSetAction = ({ quizSetId, isPublished = false }) => {
  const router = useRouter();

  const handlePublish = async () => {
    try {
      await updateAQuizset(quizSetId, { isPublished: !isPublished });
      toast.success("Quiz set published successfully");
      router.refresh();
    } catch (error) {
      throw new Error("Something went wrong!!!");
    }
  };
  const handleDelete = async () => {
    try {
      await deleteAQuizset(quizSetId);
      toast.success("Quiz set deleted successfully");
      router.refresh();
      router.back();
    } catch (error) {
      throw new Error("Something went wrong!!!");
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
            Please unpublish the quiz set before delete
          </div>
        )}
      </div>
    </div>
  );
};
