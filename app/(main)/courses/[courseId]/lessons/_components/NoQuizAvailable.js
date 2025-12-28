import { FileQuestion } from "lucide-react";

export default function NoQuizAvailable() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-400">
        <FileQuestion className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          No quiz available
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This module doesn&apos;t have any quizzes yet.
        </p>
      </div>
    </div>
  );
}
