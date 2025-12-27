import {
  ArrowLeft,
  BookOpenCheck,
  LayoutDashboard,
  Lightbulb,
} from "lucide-react";
import AlertBanner from "@/components/alert-banner";
import Link from "next/link";
import IconBadge from "@/components/icon-badge";
import ModuleTitleForm from "./_components/ModuleTitleForm";
import { getAModule } from "@/queries/module-queries";
import LessonsForm from "./_components/LessonsForm";
import ModuleActions from "./_components/ModuleActions";
import { QuizForm } from "../../_components/QuizForm";
import { getAllQuizsets } from "@/queries/quiz-queries";

export default async function editModule({ params }) {
  const { courseId, moduleId } = await params;
  const courseModule = await getAModule(moduleId);
  const quizsets = await getAllQuizsets(true);
  const quizsetOptions = quizsets.map((quiz) => {
    return {
      value: quiz.id,
      label: quiz.title,
    };
  });

  return (
    <>
      <AlertBanner
        label={
          courseModule?.isPublished
            ? "This module is published. It will be visible in the modules page."
            : "This module is unpublished. It will not be visible in the modules page."
        }
        variant={courseModule?.isPublished ? "success" : "warning"}
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
              <ModuleActions
                moduleId={moduleId}
                courseId={courseId}
                isPublished={courseModule?.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-6">
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
                <IconBadge icon={Lightbulb} />
                <h2 className="text-xl">Customize Your Quiz</h2>
              </div>
              <QuizForm
                moduleId={moduleId}
                courseId={courseId}
                initialData={{ quizset: courseModule?.quizset?.toString() }}
                options={quizsetOptions}
              />
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BookOpenCheck} />
                <h2 className="text-xl">Manage Your Lessons</h2>
              </div>
              <LessonsForm
                initialData={JSON.parse(JSON.stringify(courseModule.lessonIds))}
                moduleId={moduleId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
