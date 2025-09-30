import AlertBanner from "@/components/alert-banner";
import { QuizSetAction } from "./_components/quiz-set-action";
import { TitleForm } from "./_components/title-form";
import { AddQuizForm } from "./_components/add-quiz-form";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { Circle } from "lucide-react";
import { getQuizzesByQuizsetId } from "@/queries/quiz-queries";

const EditQuizSet = async ({ params }) => {
  const { quizSetId } = await params;
  const quizset = await getQuizzesByQuizsetId(quizSetId);

  return (
    <>
      <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />
      <div className="p-6">
        <div className="flex items-center justify-end">
          <QuizSetAction />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mt-16">
          <div className="max-lg:order-2">
            <h2 className="text-xl mb-6">Quiz List</h2>
            <div className="space-y-6">
              {quizset?.quizIds?.length ? (
                quizset.quizIds.map((quiz, idx) => {
                  return (
                    <div
                      key={idx}
                      className=" bg-gray-50 shadow-md p-4 lg:p-6 rounded-md border"
                    >
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
                          size="sm"
                          className="text-destructive"
                          variant="ghost"
                        >
                          <Trash className="w-3 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <AlertBanner
                  label="No Quiz found in this quiz set, add some using the form on right."
                  variant="warning"
                  className="rounded mb-6"
                />
              )}
            </div>
          </div>
          {/*  */}
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Customize your quiz set</h2>
            </div>
            <div className="max-w-[800px]">
              <TitleForm
                initialData={{
                  title: quizset?.title,
                  quizsetId: quizset?.id,
                }}
              />
            </div>

            <div className="max-w-[800px]">
              <AddQuizForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditQuizSet;
