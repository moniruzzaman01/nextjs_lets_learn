import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";
import { FileQuestion, NotepadText, Radio, Video } from "lucide-react";
import Lesson from "./Lesson";

export default function Module({ module }) {
  const { title, lessonIds } = module || {};

  return (
    <AccordionItem className="border-none" value={title}>
      <AccordionTrigger className=" bg-slate-100 p-2">{title}</AccordionTrigger>
      <AccordionContent>
        {/* Lessons */}
        {lessonIds && (
          <Accordion type="multiple" collapsible="true">
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className=" bg-slate-50 py-2 pl-4 mb-1">
                <span className="flex items-center gap-1.5">
                  <Video className="w-4 h-4" />
                  {lessonIds?.length} Lessons
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className=" space-y-1">
                  {lessonIds.map((lessonId, idx) => (
                    <Lesson key={idx} lessonId={lessonId} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {/* Notes */}
        <Accordion type="multiple" collapsible="true">
          <AccordionItem className="border-none" value="item-2">
            <AccordionTrigger className=" bg-slate-50 py-2 pl-4">
              <span className="flex items-center gap-1.5">
                <NotepadText className="w-4 h-4" />
                10 Notes
              </span>
            </AccordionTrigger>
            <AccordionContent>content</AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* Quiz */}
        <Accordion type="multiple" collapsible="true">
          <AccordionItem className="border-none" value="item-2">
            <AccordionTrigger className=" bg-slate-50 py-2 pl-4">
              <span className="flex items-center gap-1.5">
                <FileQuestion className="w-4 h-4" />
                10 Quiz
              </span>
            </AccordionTrigger>
            <AccordionContent>content</AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* Live Classes */}
        <Accordion type="multiple" collapsible="true">
          <AccordionItem className="border-none" value="item-2">
            <AccordionTrigger className=" bg-slate-50 py-2 pl-4">
              <span className="flex items-center gap-1.5">
                <Radio className="w-4 h-4" />1 Live Class
              </span>
            </AccordionTrigger>
            <AccordionContent>content</AccordionContent>
          </AccordionItem>
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}
