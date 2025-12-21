import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { CourseSidebar } from "./_components/course-sidebar";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAlreadyEnrolled } from "@/queries/enrollment-queries";

const CourseLayout = async ({ children, params }) => {
  const { courseId } = await params;
  const headerlist = await headers();
  const { user } =
    (await auth.api.getSession({
      headers: {
        cookie: headerlist.get("cookie") || "",
      },
    })) || {};
  if (!user?.email) {
    return redirect("/login");
  }
  const isEnrolled = await isAlreadyEnrolled(courseId, user.id);
  if (!isEnrolled) {
    return redirect(`/courses/${courseId}?reason=not-enrolled`);
  }

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
