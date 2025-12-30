"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServerToast } from "@/components/server-toast";
import Lessons from "./Lessons";
import { useSearchParams } from "next/navigation";

export default function Modules({ modules = [] }) {
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get("lesson");
  const selectedModule = modules.find((module) => {
    return module.lessonIds.find((lesson) => lesson.slug == lessonSlug);
  });

  return (
    <>
      <Accordion
        defaultValue={
          selectedModule ? [selectedModule.title] : [modules[0].title]
        }
        type="multiple"
        collapsible="true"
        className="w-full pl-6"
      >
        {modules.map((module, idx) => (
          <AccordionItem key={idx} className="border-0" value={module.title}>
            <AccordionTrigger>{module.title} </AccordionTrigger>
            <Lessons module={module} />
          </AccordionItem>
        ))}
      </Accordion>
      <ServerToast />
    </>
  );
}
