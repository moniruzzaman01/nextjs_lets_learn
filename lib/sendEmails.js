import EmailTemplateForInstructor from "@/components/email-template-for-instructors";
import EmailTemplateForStudent from "@/components/email-template-for-students";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailSendingInfo) => {
  const response = await Promise.allSettled(
    emailSendingInfo.map((item) => {
      const {
        role,
        to,
        subject,
        studentName,
        courseTitle,
        instructorName,
        startDate,
        courseDuration,
        enrollmentDate,
        totalStudents,
      } = item || {};
      const emailResponse = resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: "moniruzzamanshakib04@gmail.com" || to, //remove/change static email
        subject: subject,
        react:
          role == "student"
            ? EmailTemplateForStudent({
                studentName,
                courseTitle,
                instructorName,
                startDate,
                courseDuration,
              })
            : EmailTemplateForInstructor({
                studentName,
                courseTitle,
                enrollmentDate,
                totalStudents,
              }),
      });
      return emailResponse;
    })
  );
  return response;
};
