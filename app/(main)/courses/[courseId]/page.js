import Intro from "./_components/Intro";
import { getACourse } from "@/queries/course-queries";
import Details from "./_components/Details";
import Testimonial from "./_components/Testimonial";
import RelatedCourses from "./_components/RelatedCourses";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { ServerToast } from "@/components/server-toast";

const CourseDetailsPage = async ({ params }) => {
  const { courseId } = await params;
  const course = await getACourse(courseId);
  const { title, subtitle, thumbnail, testimonials, id, price } = course || {};

  return (
    <>
      <Intro course={{ title, id, price, subtitle, thumbnail }} />
      <Details course={course} />
      {testimonials && (
        <Testimonial testimonials={replaceMongoIdInArray(testimonials)} />
      )}
      <RelatedCourses
        courseId={courseId}
        categoryId={course.category._id.toString()}
      />
      <ServerToast />
    </>
  );
};
export default CourseDetailsPage;
