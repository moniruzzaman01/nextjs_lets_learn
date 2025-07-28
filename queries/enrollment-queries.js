import { Enrollment } from "@/models/enrollment-model";

export const getEnrollmentsByCourseId = async (courseId) => {
  const enrollments = await Enrollment.find({ course_id: courseId }).lean();
  return enrollments;
};

export const addEnrollment = async (
  student_id,
  course_id,
  transactionId,
  method
) => {
  const enrollmentData = {
    student_id,
    course_id,
    transactionId,
    method,
    enrollment_date: Date.now(),
  };
  // return enrollmentData;
  const isExist = await Enrollment.findOne({ transactionId });
  if (!isExist) {
    const response = await Enrollment.create(enrollmentData);
    return { ...response, success: true };
  } else {
    return { success: false, message: "Invalid/Duplicate tnxId!!!" };
  }
};
