import { SectionTitle } from "@/components/section-title";
import InstructorInfo from "./_components/InstructorInfo";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAUserById } from "@/queries/user-queries";
import { getCoursesDataByInstructorId } from "@/queries/course-queries";
import CourseCard from "./_components/CourseCard";
export default async function InstructorProfile({ searchParams }) {
  const { id: instructorId } = await searchParams;
  const { user } = await auth();
  if (!user) {
    redirect("/login");
  }
  const instructor = await getAUserById(instructorId);
  const courses = await getCoursesDataByInstructorId(instructorId);

  return (
    <section id="categories" className="space-y-6  py-6  lg:py-12">
      <div className="container grid grid-cols-12 lg:gap-x-8 gap-y-8">
        {/* Instructor Info */}
        <InstructorInfo instructor={instructor} />
        {/* Courses */}
        <div className="col-span-12 lg:col-span-8">
          <div>
            <SectionTitle className="mb-6">Courses</SectionTitle>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {courses.map((course, idx) => {
                return <CourseCard key={idx} course={course} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
