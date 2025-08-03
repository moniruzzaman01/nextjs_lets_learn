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

export default async function EditCourse({ params }) {
  const { courseId } = await params;
  const course = await getACourse(courseId);

  return (
    <>
      {/* a message for the instructor provided in label */}
      {course?.isPublished ? (
        <AlertBanner
          label="This course is published. It will be visible in the courses page."
          variant="success"
        />
      ) : (
        <AlertBanner
          label="This course is unpublished. It will not be visible in the courses page."
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-end">
          {/* handle the course publishing status */}
          <CourseActions isPublished={course?.isPublished} />
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
            <ImageForm initialData={{}} courseId={courseId} />
            <CategoryForm initialData={{}} courseId={courseId} />

            <QuizSetForm initialData={{}} courseId={courseId} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Modules</h2>
              </div>

              <ModulesForm initialData={[]} courseId={[]} />
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
