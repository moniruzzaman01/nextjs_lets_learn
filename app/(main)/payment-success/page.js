import { postAReport } from "@/app/action/report-action";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { sendEmails } from "@/lib/sendEmails";
import { stripe } from "@/lib/stripe.config";
import { getACourse } from "@/queries/course-queries";
import { addEnrollment } from "@/queries/enrollment-queries";
import { getAUserByEmail } from "@/queries/user-queries";
import { CircleCheck, CircleX } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const SuccessPayment = async ({ searchParams }) => {
  const { session_id, courseId } = await searchParams;
  const headerlist = await headers();
  const { user } =
    (await auth.api.getSession({
      headers: {
        cookie: headerlist.get("cookie") || {},
      },
    })) || {};

  if (!user) {
    return redirect("/login");
  }
  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }
  //retrieve checkout session response
  const {
    customer_details: { email: payerEmail, name: payerName },
    payment_intent: {
      amount,
      status: paymentStatus,
      payment_method_types,
      id: transactionId,
    },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });
  //get user and course data from the db
  const course = await getACourse(courseId);
  if (!course) throw new Error("Invalid courseId!!!");
  const student = await getAUserByEmail(user?.email);
  if (!student) throw new Error("Student not found. Please signIn again!!!");

  //store user and course info in variable for use
  const courseTitle = course?.title;
  const studentName = `${student?.firstName} ${student?.lastName}`;
  const studentEmail = student?.email;
  const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
  const instructorEmail = course?.instructor?.email;

  if (paymentStatus == "succeeded") {
    //store data to the enrolment db
    const enrollmentResponse = await addEnrollment(
      student?.id,
      courseId,
      transactionId,
      payment_method_types[0]
    );

    const emailSendingInfo = [
      {
        to: studentEmail,
        subject: `Let's begin! You have confirmed the spot in ${courseTitle}`,
        studentName,
        courseTitle,
        instructorName,
        startDate: "October 15, 2023 - dummy",
        courseDuration: "8 weeks - dummy",
        role: "student",
      },
      {
        to: instructorEmail,
        subject: `${studentName} Just Joined Your ${courseTitle} Class`,
        studentName,
        courseTitle,
        enrollmentDate: "October 15, 2023 - dummy",
        totalStudents: `500 - dummy`,
      },
    ];
    if (enrollmentResponse?.success) {
      //send emails to the student and instructor
      try {
        await sendEmails(emailSendingInfo);
      } catch (error) {
        throw new Error("Email sending failed!!!");
      }
    }
    await postAReport({ course: courseId, student: user.id });
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus == "succeeded" ? (
          <>
            <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-green-500" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations! <b>{studentName}</b> Your Enrollment is
              Successful for the course <b>{courseTitle}</b>
            </h1>
          </>
        ) : (
          <>
            <CircleX className="w-32 h-32 bg-success rounded-full p-0 text-red-500" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              OPS! <b>{studentName}</b> Your Enrollment is Failed for the course{" "}
              <b>{courseTitle}</b>
            </h1>
          </>
        )}
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/courses/${courseId}/lessons`}>Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SuccessPayment;
