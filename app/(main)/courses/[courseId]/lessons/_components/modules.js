import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";

export default function Modules({ modules = [] }) {
  const isActive = true;
  const isCompleted = true;

  return (
    <>
      {modules.map((module, idx) => (
        <AccordionItem className="border-0" value={module.title} key={idx}>
          <AccordionTrigger>{module.title} </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col w-full gap-3">
              {/* active and completed */}
              {/* <button
                          type="button"
                          className={cn(
                            "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600 ",
                            isActive && "text-slate-700  hover:text-slate-700",
                            isCompleted && "text-emerald-700 hover:text-emerald-700"
                          )}
                        >
                          <div className="flex items-center gap-x-2">
                            <CheckCircle
                              size={16}
                              className={cn(
                                "text-slate-500",
                                isActive && "text-slate-700",
                                isCompleted && "text-emerald-700"
                              )}
                            />
                            Introduction
                          </div>
                        </button> */}

              {module.lessonIds?.length > 0 &&
                module.lessonIds.map((lesson, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={cn(
                      "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600 ",
                      false && "text-slate-700  hover:text-slate-700",
                      isCompleted &&
                        false &&
                        "text-emerald-700 hover:text-emerald-700"
                    )}
                  >
                    <div className="flex items-center gap-x-2">
                      <PlayCircle
                        size={16}
                        className={cn(
                          "text-slate-500",
                          isActive && "text-slate-700"
                        )}
                      />
                      {lesson.title}
                    </div>
                  </button>
                ))}

              {/* lock*/}
              {/* <button
                          type="button"
                          className={cn(
                            "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600",
                            false && "text-slate-700  hover:text-slate-700",
                            isCompleted &&
                              false &&
                              "text-emerald-700 hover:text-emerald-700"
                          )}
                        >
                          <div className="flex items-center gap-x-2">
                            <Lock
                              size={16}
                              className={cn(
                                "text-slate-500",
                                isActive && "text-slate-700"
                              )}
                            />
                            What is React ?
                          </div>
                        </button> */}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
}
