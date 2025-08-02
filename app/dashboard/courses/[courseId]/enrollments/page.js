import { getEnrollmentStat } from "@/queries/enrollment-queries";
import { columns } from "./_components/Columns";
import DataTable from "./_components/DataTable";

export default async function EnrollmentsPage({ params }) {
  const { courseId } = await params;
  const enrollments = await getEnrollmentStat({ course: courseId });

  return (
    <div className="p-6">
      <h2>{enrollments[0]?.course?.title}</h2>
      <DataTable columns={columns} data={enrollments} />
    </div>
  );
}
