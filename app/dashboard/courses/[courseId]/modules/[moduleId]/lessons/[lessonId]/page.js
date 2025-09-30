import IconBadge from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import { Eye } from "lucide-react";
import { Video } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import VideoUrlForm from "@/components/video-url-form";
import { formatSecondsToHMS } from "@/lib/formatTime";
import LessonActions from "../../_components/LessonActions";
import LessonTitleForm from "../../_components/LessonTitleForm";
import LessonDescriptionForm from "../../_components/LessonDescriptionForm";
import LessonAccessForm from "../../_components/LessonAccessForm";
import Link from "next/link";
import { getALessonById } from "@/queries/lesson-queries";
import AlertBanner from "@/components/alert-banner";

export default async function EditLessonPage({ params }) {
  const { lessonId, moduleId, courseId } = await params;
  const lesson = await getALessonById(lessonId);

  return (
    <>
      <AlertBanner
        label={
          lesson?.isPublished
            ? "This lesson is published. It will be visible in the lessons page."
            : "This lesson is unpublished. It will not be visible in the lessons page."
        }
        variant={lesson?.isPublished ? "success" : "warning"}
      />
      <div className="w-[96%] overflow-y-auto  bg-white p-[2%] sm:max-w-[1200px] max-h-[90vh] rounded-xl">
        <div className=" w-full mx-auto">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <Link
                href={`/dashboard/courses/${courseId}/modules/${moduleId}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
              </Link>
              <div className="flex items-center justify-end">
                <LessonActions
                  lessonId={lessonId}
                  moduleId={moduleId}
                  isPublished={lesson.isPublished}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Customize Your Lesson</h2>
                </div>
                <LessonTitleForm
                  initialData={{ title: lesson.title }}
                  lessonId={lessonId}
                />
                <LessonDescriptionForm
                  initialData={{ description: lesson.description }}
                  lessonId={lessonId}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Eye} />
                  <h2 className="text-xl">Access Settings</h2>
                </div>
                <LessonAccessForm
                  initialData={{ isPublic: lesson.isPublic }}
                  lessonId={lessonId}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Add a video</h2>
              </div>
              <VideoUrlForm
                initialData={{
                  video_url: lesson.video_url,
                  duration: formatSecondsToHMS(lesson.duration),
                }}
                lessonId={lessonId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
