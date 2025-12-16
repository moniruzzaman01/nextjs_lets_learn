import { auth } from "@/auth";
import EnrolledCourseCard from "../../_components/EnrolledCourseCard";
import { redirect } from "next/navigation";
import { getAUserByEmail } from "@/queries/user-queries";
import { getEnrollmentByStudentId } from "@/queries/enrollment-queries";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { headers } from "next/headers";

export default async function EnrolledCourses() {
  const headerlist = await headers();
  const { user } =
    (await auth.api.getSession({
      headers: {
        cookie: headerlist.get("cookie") || "",
      },
    })) || {};

  if (!user) {
    redirect("/login");
  }
  const loggedInUser = await getAUserByEmail(user?.email);
  const enrollments = await getEnrollmentByStudentId(loggedInUser?.id);
  return (
    <div className="min-h-[60vh] flex flex-col justify-center">
      {enrollments && enrollments.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {enrollments.map((enrollment, idx) => (
            <EnrolledCourseCard key={idx} enrollment={enrollment} />
          ))}
        </div>
      ) : (
        <div className=" w-2/3 mx-auto ">
          <CircleX className="w-20 h-20 bg-success rounded-full p-0 text-red-500 mx-auto" />
          <h1 className="text-lg md:text-xl lg:text-2xl text-center my-5">
            Dear
            <br />
            <b>
              {loggedInUser?.firstName} {loggedInUser?.lastName}
            </b>
            <br />
            We are so sorry that we don&apos;t have any{" "}
            {loggedInUser?.role == "student" ? "Enrollment" : "Course"} data for
            you!
          </h1>
          <div className="flex justify-center">
            <Button asChild size="sm">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
