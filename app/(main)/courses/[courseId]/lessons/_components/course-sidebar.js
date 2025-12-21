import { CourseProgress } from "@/components/course-progress";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getACourse } from "@/queries/course-queries";
import Modules from "./modules";

export const CourseSidebar = async ({ courseId }) => {
  const course = (await getACourse(courseId, true)) || {};
  const { modules = [] } = course || {};

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-6 pt-10 lg:pt-6 flex flex-col border-b gap-y-5">
          <h1 className="font-semibold capitalize">{course?.title}</h1>
          <CourseProgress value={80} />
        </div>
        <Accordion
          defaultValue={modules[0]?.title ? [modules[0].title] : []}
          type="multiple"
          collapsible="true"
          className="w-full pl-6"
        >
          <Modules modules={modules} />
        </Accordion>
        <Button className=" w-[85%] mx-auto my-6">Download Certificate</Button>
      </div>
    </>
  );
};
