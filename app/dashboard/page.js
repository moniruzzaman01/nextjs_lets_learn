import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import { getCoursesByInstructorId } from "@/queries/course-queries";
import { getAUserByEmail } from "@/queries/user-queries";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { user } = await auth();
  if (!user) redirect("/login");

  const loggedInUser = await getAUserByEmail(user?.email);
  if (loggedInUser?.role != "instructor") redirect("/forbidden-page");
  const { courses, totalRevinue, studentLearned, reviews, avgRatings } =
    (await getCoursesByInstructorId(loggedInUser?.id)) || {};

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* total courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses}</div>
          </CardContent>
        </Card>
        {/* total enrollments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentLearned}</div>
          </CardContent>
        </Card>
        {/* total revinue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(totalRevinue)}
            </div>
          </CardContent>
        </Card>
        {/* total reviews */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews}</div>
          </CardContent>
        </Card>
        {/* average ratings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Ratings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRatings}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
