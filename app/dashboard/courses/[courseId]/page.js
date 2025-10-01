import IconBadge from "@/components/icon-badge";
import AlertBanner from "@/components/alert-banner";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import CourseActions from "./_components/CourseActions";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import QuizSetForm from "./_components/QuizForm";
import ModulesForm from "./_components/ModulesForm";
import PriceForm from "./_components/PriceForm";
import { getACourse } from "@/queries/course-queries";
import { getAllCategories } from "@/queries/category-queries";
import { getAllQuizsets } from "@/queries/quiz-queries";

export default async function EditCourse({ params }) {
  const { courseId } = await params;
  const course = await getACourse(courseId);
  const categories = await getAllCategories();
  const categoryOptions = categories.map((category) => {
    return {
      value: category.id,
      label: category.title,
    };
  });
  const quizsets = await getAllQuizsets(true);
  const quizsetOptions = quizsets.map((qs) => {
    return {
      value: qs.id,
      label: qs.title,
    };
  });

  return (
    <>
      <AlertBanner
        label={
          course?.isPublished
            ? "This course is published. It will be visible in the courses page."
            : "This course is unpublished. It will not be visible in the courses page."
        }
        variant={course?.isPublished ? "success" : "warning"}
      />
      <div className="p-6">
        <div className="flex items-center justify-end">
          <CourseActions
            isPublished={course?.isPublished}
            courseId={courseId}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{
                title: course?.title,
              }}
              courseId={courseId}
            />
            <DescriptionForm
              initialData={{ description: course?.description }}
              courseId={courseId}
            />
            <ImageForm
              initialData={{ thumbnail: course?.thumbnail }}
              courseId={courseId}
            />
            <CategoryForm
              initialData={{ category: course?.category?._id?.toString() }}
              courseId={courseId}
              options={categoryOptions}
            />
            <QuizSetForm
              initialData={{ quizSetId: course?.quizset?.toString() }}
              courseId={courseId}
              options={quizsetOptions}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Modules</h2>
              </div>

              <ModulesForm
                initialData={JSON.parse(
                  JSON.stringify(
                    course?.modules?.sort((a, b) => a.order - b.order)
                  )
                )}
                courseId={courseId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell you course</h2>
              </div>
              <PriceForm
                initialData={{ price: course?.price }}
                courseId={courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
