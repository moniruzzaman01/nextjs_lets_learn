import { getTestimonialsByCourseId } from "@/queries/testimonial-queries";
import { columns } from "./_components/Columns";
import DataTable from "./_components/DataTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAUserByEmail } from "@/queries/user-queries";
import { headers } from "next/headers";

export default async function TestimonialPage({ params }) {
  const { courseId } = await params;
  const headerlist = await headers();
  const { user } =
    (await auth.api.getSession({
      headers: {
        cookie: headerlist.get("cookie") || {},
      },
    })) || {};
  if (!user) redirect("/login");
  const loggedInUser = await getAUserByEmail(user?.email);
  if (loggedInUser?.role != "instructor") redirect("/forbidden-page");
  const testimonials = await getTestimonialsByCourseId(courseId);

  return (
    <div className="p-6">
      <h2>{testimonials[0]?.course?.title}</h2>
      <DataTable columns={columns} data={testimonials} />
    </div>
  );
}
