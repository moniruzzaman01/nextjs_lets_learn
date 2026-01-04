import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import MobileFilter from "./_components/MobileFilter";
import SelectedFilters from "./_components/SelectedFilters";
import CourseFilter from "./_components/CourseFilter";
import { getAllCourses } from "@/queries/course-queries";
import { SectionTitle } from "@/components/section-title";
import CourseCard from "./_components/CourseCard";
import NotFound from "@/components/not-found";

const CoursesPage = async () => {
  const courses = await getAllCourses();
  if (!courses.length)
    return (
      <section className="container space-y-6 dark:bg-transparent py-6 h-[70vh]">
        <SectionTitle>All Courses</SectionTitle>
        <div className=" flex items-center justify-center h-full">
          <NotFound title="Courses not found!!!" />
        </div>
      </section>
    );

  return (
    <section
      id="courses"
      className="container space-y-6   dark:bg-transparent py-6"
    >
      <SectionTitle>All Courses</SectionTitle>
      {/* header start */}
      <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <SearchCourse />
        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortCourse />
          <MobileFilter />
        </div>
      </div>
      {/* header ends */}
      {/* active/selected filters start */}
      <SelectedFilters
        filter={{
          categories: ["development"],
          price: ["free"],
          sort: "",
        }}
      />
      {/* active/selected filters */}
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters section start */}
          <CourseFilter />
          {/* Filters section end */}
          {/* Course grid start */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {courses.map((course) => {
              return <CourseCard key={course?.id} course={course} />;
            })}
          </div>
          {/* Course grid end */}
        </div>
      </section>
    </section>
  );
};
export default CoursesPage;
