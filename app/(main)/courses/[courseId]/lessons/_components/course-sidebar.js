import { CourseProgress } from "@/components/course-progress";
import { Button } from "@/components/ui/button";
import { getACourse } from "@/queries/course-queries";
import Modules from "./modules";
import { View } from "@/models/views-model";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { getAReport } from "@/queries/report-queries";

export const CourseSidebar = async ({ courseId }) => {
  const headerlist = await headers();
  const { user } =
    (await auth.api.getSession({
      headers: {
        cookie: headerlist.get("cookie") || "",
      },
    })) || {};
  const course = (await getACourse(courseId, true)) || {};
  const { modules = [] } = course || {};
  const structuredModules = await Promise.all(
    modules.map(async (module) => {
      const moduleId = module._id.toString();
      const lessons = module?.lessonIds;
      await Promise.all(
        lessons.map(async (lesson) => {
          const lessonId = lesson._id.toString();
          const view = await View.findOne({
            module: moduleId,
            user: user.id.toString(),
            lesson: lessonId,
          }).lean();
          if (view?.state) {
            lesson.state = "completed";
          }
          return lesson;
        })
      );
      return module;
    })
  );
  const totalLessons =
    modules.flatMap((module) => module.lessonIds)?.length || 0;
  const report = await getAReport({
    course: courseId,
    student: user.id,
  });
  const lessonCompleted = report?.totalCompletedLessons?.length ?? 0;

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-6 pt-10 lg:pt-6 flex flex-col border-b gap-y-5">
          <h1 className="font-semibold capitalize">{course?.title}</h1>
          <CourseProgress value={(lessonCompleted / totalLessons) * 100} />
        </div>
        <Modules modules={JSON.parse(JSON.stringify(structuredModules))} />
        <Button className=" w-[85%] mx-auto my-6">Download Certificate</Button>
      </div>
    </>
  );
};
