import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { CourseSidebar } from "./course-sidebar";

export const CourseSidebarMobile = ({ courseId }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <CourseSidebar courseId={courseId} />
      </SheetContent>
    </Sheet>
  );
};
