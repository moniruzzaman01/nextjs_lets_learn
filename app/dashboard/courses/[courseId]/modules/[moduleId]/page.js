import AlertBanner from "@/components/alert-banner";
import { ArrowLeft, BookOpenCheck, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import CourseActions from "../../_components/CourseActions";
import IconBadge from "@/components/icon-badge";
import ModuleTitleForm from "./_components/ModuleTitleForm";
import { getAModule } from "@/queries/module-queries";
import LessonForm from "./_components/LessonForm";

export default async function editModule({ params }) {
  const { courseId, moduleId } = await params;
  const courseModule = await getAModule(moduleId);

  return (
    <>
      <AlertBanner
        label="This module is unpublished. It will not be visible in the course."
        variant="warning"
      />

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to edit course
            </Link>
            <div className="flex items-center justify-end">
              <CourseActions />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize Your module</h2>
              </div>
              <ModuleTitleForm
                initialData={courseModule.title}
                courseId={courseId}
                moduleId={moduleId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BookOpenCheck} />
                <h2 className="text-xl">Manage Your Lessons</h2>
              </div>
              <LessonForm
                initialData={JSON.parse(JSON.stringify(courseModule.lessonIds))}
                moduleId={moduleId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              {/* <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2> */}
            </div>
            {/* <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
