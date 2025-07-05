import Intro from "./_components/Intro";
import { getACourse } from "@/queries/course-queries";
import Details from "./_components/Details";
import Testimonial from "./_components/Testimonial";
import RelatedCourses from "./_components/RelatedCourses";
import { replaceMongoIdInArray } from "@/lib/convertData";

const CourseDetailsPage = async ({ params }) => {
  const { courseId } = await params;
  const course = await getACourse(courseId);
  const { title, subtitle, thumbnail, testimonials } = course || {};

  return (
    <>
      <Intro title={title} subtitle={subtitle} thumbnail={thumbnail} />
      <Details course={course} />
      {testimonials && (
        <Testimonial testimonials={replaceMongoIdInArray(testimonials)} />
      )}
      <RelatedCourses />
    </>
  );
};
export default CourseDetailsPage;
