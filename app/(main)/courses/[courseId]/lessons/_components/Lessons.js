import { AccordionContent } from "@radix-ui/react-accordion";
import Lesson from "./lesson";

export default function Lessons({ module }) {
  return (
    <AccordionContent>
      <div className="flex flex-col w-full gap-3">
        {module.lessonIds?.length > 0 &&
          module.lessonIds.map((lesson, idx) => (
            <Lesson
              key={idx}
              lesson={JSON.parse(JSON.stringify(lesson))}
              moduleSlug={module.slug}
            />
          ))}
      </div>
    </AccordionContent>
  );
}
