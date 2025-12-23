import { Button } from "@/components/ui/button";
import { VideoPlayer } from "./_components/video-player";
import { Separator } from "@/components/ui/separator";
import VideoDescription from "./_components/video-description";
import { getACourse } from "@/queries/course-queries";
import { getALessonByLessonSlugAndModuleSlug } from "@/queries/lesson-queries";

const Course = async ({ params, searchParams }) => {
  const { courseId } = await params;
  const { lesson: lessonSlug, module: moduleSlug } = await searchParams;
  const { modules } = await getACourse(courseId, true);
  const selectedLesson = (await getALessonByLessonSlugAndModuleSlug(
    lessonSlug,
    moduleSlug
  )) || {
    lessonId: modules[0].lessonIds[0]._id.toString(),
    moduleId: modules[0]._id.toString(),
    video_url: modules[0].lessonIds[0].video_url,
    // lessonTitle: modules[0].lessonIds[0].title,
    // moduleTitle: modules[0].title,
  };

  return (
    <div>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4 w-full">
          <VideoPlayer selectedLesson={selectedLesson} />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2 lg:mb-0">
              Introduction
            </h2>
            <Button size="lg">Enroll</Button>
          </div>
          <Separator />
          <VideoDescription />
        </div>
      </div>
    </div>
  );
};
export default Course;
