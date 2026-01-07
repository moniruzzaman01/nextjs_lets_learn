import { CourseProgress } from "@/components/course-progress";
import { Badge } from "@/components/ui/badge";
import { getAReport } from "@/queries/report-queries";
import { BookOpen, BookOpenCheck } from "lucide-react";
import CardHead from "./CardHead";

export default async function EnrolledCourseCard({ enrollment }) {
  const {
    course: {
      _id: courseId,
      title,
      category: { title: categoryTitle } = {},
      thumbnail,
      modules,
    } = {},
    student: { _id: studentId } = {},
  } = enrollment || {};

  const {
    totalCompletedLessons,
    totalCompletedModules,
    quizAssessment: { otherMarks } = {},
    totalQuiz,
    quizAttempted,
    noOfCorrectQuiz,
  } = (await getAReport({
    course: courseId,
    student: studentId,
  })) || {};
  const value =
    ((totalCompletedModules?.length || 1) / (modules?.length || 0)) * 100;

  return (
    <div className=" hover:shadow transition overflow-hidden border rounded-lg p-3 h-full">
      <CardHead
        title={title}
        courseId={courseId.toString()}
        thumbnail={thumbnail}
        categoryTitle={categoryTitle}
      />
      <div className="flex flex-col">
        <div className="my-3 flex items-center justify-between gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpen className="w-4" />
            </div>
            <span>{modules?.length} Modules</span>
          </div>
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpenCheck className="w-4" />
            </div>
            <span>{totalCompletedModules?.length || 0} Modules</span>
          </div>
        </div>
        <div className=" border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <div className="text-md md:text-sm font-medium text-slate-700">
              Total Lessons: <Badge variant="success">{modules?.length}</Badge>
            </div>
            <div className="text-md md:text-sm font-medium text-slate-700">
              Total Quizzes: <Badge variant="success">{totalQuiz || "-"}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-md md:text-sm font-medium text-slate-700">
              Total Completed L:{" "}
              <Badge variant="success">
                {totalCompletedLessons?.length || 0}
              </Badge>
            </div>
            <div className="text-md md:text-sm font-medium text-slate-700">
              Quiz Attempted:{" "}
              <Badge variant="success">{quizAttempted || "-"}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-end mt-2 border-b pb-2 mb-2">
            <div className="text-md md:text-sm font-medium text-slate-700">
              Correct Quizzes:{" "}
              <Badge variant="success">{noOfCorrectQuiz || "-"}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Mark from Quizzes
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {noOfCorrectQuiz
                ? noOfCorrectQuiz + " X 5 = " + noOfCorrectQuiz * 5
                : "-"}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Others
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {otherMarks ? "= " + otherMarks : "-"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-md md:text-sm font-medium text-slate-700">
            Total Marks
          </p>

          <p className="text-md md:text-sm font-medium text-slate-700">
            {noOfCorrectQuiz && otherMarks
              ? "= " + (noOfCorrectQuiz * 5 + otherMarks)
              : "-"}
          </p>
        </div>
      </div>
      <CourseProgress value={value} />
    </div>
  );
}
