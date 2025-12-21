import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { CourseSidebar } from "./_components/course-sidebar";

const CourseLayout = async ({ children, params }) => {
  const { courseId } = await params;

  return (
    <div className="lg:flex">
      <div className="h-[80px] lg:hidden lg:pl-96 w-full z-50">
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
          <CourseSidebarMobile courseId={courseId} />
        </div>
      </div>
      <div className="hidden lg:flex h-full w-96 flex-col z-50">
        <CourseSidebar courseId={courseId} />
      </div>
      <main className="pt-14 w-full h-[80vh] overflow-y-scroll">
        {children}
      </main>
    </div>
  );
};
export default CourseLayout;
