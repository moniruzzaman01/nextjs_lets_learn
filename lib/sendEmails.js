import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailData) => {
  const { studentName, courseTitle, studentEmail, instructor } = emailData;

  const response = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "moniruzzamanshakib04@gmail.com" || studentEmail, //remove/change static email
    subject: `Let's begin! You have confirmed the spot in ${courseTitle}`,
    react: EmailTemplate({
      studentName: studentName,
      courseName: courseTitle,
      instructorName: instructor,
      startDate: "October 15, 2023 - dummy",
      courseDuration: "8 weeks - dummy",
    }),
  });
  return response;
};
