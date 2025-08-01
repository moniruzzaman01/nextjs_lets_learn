import { getTestimonialsByCourseId } from "@/queries/testimonial-queries";
import { columns } from "./_components/Columns";
import DataTable from "./_components/DataTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAUserByEmail } from "@/queries/user-queries";

export default async function TestimonialPage({ params }) {
  const { courseId } = await params;
  const { user } = await auth();
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
