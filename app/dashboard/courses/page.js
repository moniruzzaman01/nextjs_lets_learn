import DataTable from "./_components/DataTable";
import { columns } from "./_components/Columns";
import { getCoursesDataByInstructorId } from "@/queries/course-queries";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAUserByEmail } from "@/queries/user-queries";

export default async function CoursesPage() {
  const { user } = await auth();
  if (!user) redirect("/login");
  const loggedInUser = await getAUserByEmail(user?.email);
  if (loggedInUser?.role != "instructor") redirect("/forbidden-page");
  const courses = await getCoursesDataByInstructorId(loggedInUser?.id);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
