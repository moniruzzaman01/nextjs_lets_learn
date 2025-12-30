import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Sparkles } from "lucide-react";

export default function QuizCard({ setOpen, title, totalMarks }) {
  return (
    <div className="relative w-full max-w-[290px] overflow-hidden rounded-md bg-background border">
      <div className="relative h-20 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700">
        <div className="absolute -bottom-6 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-background shadow ring-1 ring-border">
          <Brain className="h-6 w-6 text-slate-500 dark:text-slate-300" />
        </div>
      </div>
      <div className="space-y-4 px-5 pb-5 pt-10 text-center">
        <h3 className="line-clamp-2 text-base font-medium text-foreground">
          {title}
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-slate-400" />
          <span>Total Marks</span>
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
          >
            {totalMarks}
          </Badge>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded bg-slate-800 text-slate-100 dark:bg-slate-200 dark:text-slate-900"
        >
          <span className="text-sm font-medium">Start Quiz</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
