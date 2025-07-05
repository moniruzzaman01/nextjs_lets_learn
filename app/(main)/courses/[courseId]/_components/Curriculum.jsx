import { BookCheck, Clock10 } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import Module from "./Module";

export default function Curriculum({ course }) {
  const { modules } = course || {};
  const courseDuration = course?.modules?.reduce(
    (acc, curr) => acc + curr?.duration,
    0
  );

  return (
    <>
      <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {Math.floor(courseDuration / 60)}+ Hours
        </span>
        {/* <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />4 Live Class
        </span> */}
      </div>
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        collapsible="true"
        className="w-full"
      >
        {modules &&
          modules?.map((module, idx) => <Module key={idx} module={module} />)}
      </Accordion>
    </>
  );
}
