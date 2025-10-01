"use client";

import { deleteAQuiz } from "@/app/action/quiz-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Circle, CircleCheck, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function QuizList({ quiz, quizSetId }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteAQuiz(quiz._id, quizSetId);
      toast.success("Quiz deleted successfully");
      router.refresh();
    } catch (error) {
      throw new Error(`${error ? error.message : "Something went wrong!!!"}`);
    }
  };
  return (
    <div className=" bg-gray-50 shadow-md p-4 lg:p-6 rounded-md border">
      <h2 className="mb-3">{quiz.question}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quiz.options.map((option, idx) => {
          return (
            <div
              key={idx}
              className={cn(
                "py-1.5 rounded-sm  text-sm flex items-center gap-1 text-gray-600"
              )}
            >
              {option.is_correct ? (
                <CircleCheck className="size-4 text-emerald-500 " />
              ) : (
                <Circle className="size-4" />
              )}

              <p>{option.text}</p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-2 mt-6">
        <Button variant="ghost" size="sm">
          <Pencil className="w-3 mr-1" /> Edit
        </Button>
        <Button
          onClick={handleDelete}
          size="sm"
          className="text-destructive"
          variant="ghost"
        >
          <Trash className="w-3 mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
}
