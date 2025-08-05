import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LayoutDashboard } from "lucide-react";
import { Eye } from "lucide-react";
import { Video } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CourseActions from "../../../_components/CourseActions";
import IconBadge from "@/components/icon-badge";
import LessonTitleForm from "./LessonTitleForm";
import LessonDescriptionForm from "./LessonDescriptionForm";
import LessonAccessForm from "./LessonAccessForm";
import { useParams } from "next/navigation";
// import VideoUrlForm from "./VideoUrlForm";

export default function LessonModal({ open, setOpen, lesson, lessonId }) {
  // console.log("-----lesson", lesson);
  const { courseId } = useParams();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle hidden>Dialog Title</DialogTitle>
      <DialogContent
        className="sm:max-w-[1200px] w-[96%] overflow-y-auto max-h-[90vh]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div>
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
                  <h2 className="text-xl">Customize Your Lesson</h2>
                </div>
                <LessonTitleForm
                  initialData={{ title: lesson.title }}
                  lessonId={lessonId}
                />
                <LessonDescriptionForm
                  initialData={{}}
                  courseId={"1"}
                  lessonId={"1"}
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
              {/* <VideoUrlForm
                initialData={{
                  url: "https://www.youtube.com/embed/Cn4G2lZ_g2I?si=8FxqU8_NU6rYOrG1",
                }}
                courseId={1}
                lessonId={1}
              /> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
