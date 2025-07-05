import { Enrollment } from "@/models/enrollment-model";

export const getEnrollmentsByCourseId = async (courseId) => {
  const enrollments = await Enrollment.find({ course_id: courseId }).lean();
  return enrollments;
};
