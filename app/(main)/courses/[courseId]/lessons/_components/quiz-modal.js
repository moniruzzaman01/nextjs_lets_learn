import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  FileQuestion,
  Info,
  MessageCircleQuestionMark,
} from "lucide-react";

function QuizModal({ open, setOpen, quizzes }) {
  const totalQuizes = quizzes?.length;
  const [quizIndex, setQuizIndex] = useState(0);
  const lastQuizIndex = totalQuizes - 1;
  const currentQuiz = quizzes[quizIndex];

  const quizChangeHanlder = (type) => {
    const nextQuizIndex = quizIndex + 1;
    const prevQuizIndex = quizIndex - 1;
    if (type === "next" && nextQuizIndex <= lastQuizIndex) {
      return setQuizIndex((prev) => prev + 1);
    }
    if (type === "prev" && prevQuizIndex >= 0) {
      setQuizIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle />
        <DialogDescription />
        <DialogContent className="sm:max-w-[90%] lg:max-w-[70%] block">
          <div className="pb-4 border-b border-border text-sm">
            <span className="text-success inline-block mr-1">
              {quizIndex + 1} / {quizzes.length}
            </span>{" "}
            টি প্রশ্ন
          </div>
          <div className="py-4">
            <h3 className="text-xl font-medium mb-10 flex gap-2">
              <MessageCircleQuestionMark />
              {currentQuiz.question}
            </h3>
            <div className=" flex justify-end items-center">
              <Info className=" h-4" />
              <span className="text-[10px] block text-end">
                একটি প্রশ্নের একাধিক উত্তর হতে পারে & ভুল সিলেকশনে কোন নেগেটিভ
                মার্কিং নেই
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {currentQuiz?.options.map((option) => (
              <div key={option._id}>
                <input
                  className="opacity-0 invisible absolute [&:checked_+_label]:bg-success/5"
                  type="checkbox"
                  id={`option-${option._id}`}
                />
                <Label
                  className="border border-border rounded px-2 py-3 block cursor-pointer hover:bg-gray-50 transition-all font-normal"
                  htmlFor={`option-${option._id}`}
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter className="flex gap-4 justify-between w-full sm:justify-between">
            <Button
              className="gap-2 rounded-3xl"
              disabled={quizIndex === 0}
              onClick={() => quizChangeHanlder("prev")}
            >
              <ArrowLeft /> Previous Quiz
            </Button>
            <Button
              className="gap-2 rounded-3xl"
              disabled={quizIndex >= lastQuizIndex}
              onClick={() => quizChangeHanlder("next")}
            >
              Next Quiz <ArrowRight />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QuizModal;
