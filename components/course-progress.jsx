import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

export const CourseProgress = ({ value = 0 }) => {
  return (
    <div>
      <Progress value={value} className={cn("h-1")} />
      <p className={cn("font-medium mt-2 text-sky-700 text-xs")}>
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};
