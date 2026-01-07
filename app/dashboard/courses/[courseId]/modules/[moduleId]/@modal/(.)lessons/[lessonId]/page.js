"use client";

import IconBadge from "@/components/icon-badge";
import { LayoutDashboard, LoaderCircle } from "lucide-react";
import { Eye } from "lucide-react";
import { Video } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import LessonTitleForm from "../../../_components/LessonTitleForm";
import LessonDescriptionForm from "../../../_components/LessonDescriptionForm";
import LessonAccessForm from "../../../_components/LessonAccessForm";
import { useParams, useRouter } from "next/navigation";
import VideoUrlForm from "@/components/video-url-form";
import { formatSecondsToHMS } from "@/lib/formatTime";
import LessonActions from "../../../_components/LessonActions";
import { useEffect, useState } from "react";
import { fetchALesson } from "@/app/action/lesson-action";

export default function EditLessonModal() {
  const { lessonId, moduleId } = useParams();
  const [lesson, setLesson] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await fetchALesson(lessonId);
      setLesson(data);
    })();
  }, [lessonId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        router.back();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  if (!lesson)
    return (
      <>
        <div className=" bg-slate-200 absolute top-0 left-0 h-screen w-screen opacity-50"></div>
        <LoaderCircle className=" absolute left-[48%]  top-[48%] z-50 animate-spin duration-1000" />
      </>
    );

  return (
    <div className=" bg-zinc-500 w-screen h-screen fixed top-0 left-0 z-50 bg-opacity-50 flex items-center">
      <div className="w-[96%] overflow-y-auto  bg-white p-[2%] sm:max-w-[1200px] max-h-[90vh] mx-auto my-auto rounded-xl">
        <div className=" w-full mx-auto">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <button
                onClick={() => {
                  router.refresh();
                  router.back();
                }}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
              </button>
              <div className="flex items-center justify-end">
                <LessonActions
                  lessonId={lessonId}
                  moduleId={moduleId}
                  isPublished={lesson.isPublished}
                  setLesson={setLesson}
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
    </div>
  );
}
