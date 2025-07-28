import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe.config";
import { getACourse } from "@/queries/course-queries";
import { addEnrollment } from "@/queries/enrollment-queries";
import { getAUserByEmail } from "@/queries/user-queries";
import { CircleCheck, CircleX } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const SuccessPayment = async ({ searchParams }) => {
  const { session_id, courseId } = await searchParams;
  const userSession = await auth();
  if (!userSession?.user?.email) {
    return redirect("/login");
  }
  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }
  const course = await getACourse(courseId);
  const student = await getAUserByEmail(userSession?.user?.email);
  const studentName = `${student?.firstName} ${student?.lastName}`;
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

  if (paymentStatus == "succeeded") {
    //store data to the enrolment db
    const res = await addEnrollment(
      student?.id,
      courseId,
      transactionId,
      payment_method_types[0]
    );
    console.log(res);
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus == "succeeded" ? (
          <>
            <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-green-500" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations! <b>{studentName}</b> Your Enrollment is
              Successful for the course <b>{course?.title}</b>
            </h1>
          </>
        ) : (
          <>
            <CircleX className="w-32 h-32 bg-success rounded-full p-0 text-red-500" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              OPS! <b>{studentName}</b> Your Enrollment is Failed for the course{" "}
              <b>{course?.title}</b>
            </h1>
          </>
        )}
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="#">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SuccessPayment;
