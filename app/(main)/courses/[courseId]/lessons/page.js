import { VideoPlayer } from "./_components/video-player";
import VideoDescription from "./_components/video-description";
import { getACourse } from "@/queries/course-queries";
import { getALessonByLessonSlugAndModuleSlug } from "@/queries/lesson-queries";
import { getQuizzesByModuleSlug } from "@/queries/quiz-queries";

const Course = async ({ params, searchParams }) => {
  const { courseId } = await params;
  const { lesson: lessonSlug, module: moduleSlug, reason } = await searchParams;
  const { modules } = await getACourse(courseId, true);
  let selectedLesson = {
    lessonId: modules[0].lessonIds[0]._id.toString(),
    moduleId: modules[0]._id.toString(),
    video_url: modules[0].lessonIds[0].video_url,
  };
  if (lessonSlug && moduleSlug) {
    selectedLesson = await getALessonByLessonSlugAndModuleSlug(
      lessonSlug,
      moduleSlug
    );
  }
  const quizset = await getQuizzesByModuleSlug(moduleSlug);

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4 w-full">
        {reason == "private-lesson" ? (
          <div className=" h-[480px] w-full flex justify-center items-center border">
            <p className="  text-sm text-red-500">This video is private!!!</p>
          </div>
        ) : selectedLesson ? (
          <VideoPlayer selectedLesson={selectedLesson} courseId={courseId} />
        ) : (
          <div className=" h-[480px] w-full flex justify-center items-center border">
            <p className="  text-sm text-red-500">No video found!!!</p>
          </div>
        )}
      </div>
      <div>
        <VideoDescription
          moduleId={selectedLesson.moduleId}
          courseId={courseId}
          quizset={JSON.parse(JSON.stringify(quizset))}
        />
      </div>
    </div>
  );
};
export default Course;
