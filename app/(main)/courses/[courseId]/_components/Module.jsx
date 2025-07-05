import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Video } from "lucide-react";
import Lesson from "./Lesson";

export default function Module({ module }) {
  const { title, lessonIds } = module || {};

  return (
    <AccordionItem className="border-none" value="item-1">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        {/* module summary start */}
        <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
          <span className="flex items-center gap-1.5">
            <Video className="w-4 h-4" />
            {lessonIds?.length} Lessons
          </span>
          {/* <span className="flex items-center gap-1.5">
            <NotepadText className="w-4 h-4" />
            10 Notes
          </span>
          <span className="flex items-center gap-1.5">
            <FileQuestion className="w-4 h-4" />
            10 Quiz
          </span>
          <span className="flex items-center gap-1.5">
            <Radio className="w-4 h-4" />1 Live Class
          </span> */}
        </div>
        {/* module summary ends */}

        <div className="space-y-3">
          {/* lesson start */}
          {lessonIds &&
            lessonIds.map((lessonId, idx) => (
              <Lesson key={idx} lessonId={lessonId} />
            ))}
          {/* lesson ends */}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
