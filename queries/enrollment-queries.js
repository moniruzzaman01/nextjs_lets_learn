import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Enrollment } from "@/models/enrollment-model";
import { User } from "@/models/user-model";

export const getEnrollmentsByCourseId = async (courseId) => {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
};

export const getEnrollmentByStudentId = async (studentId) => {
  const enrollment = await Enrollment.find({ student: studentId })
    .populate({
      path: "course",
      model: Course,
      populate: {
        path: "category",
        model: Category,
      },
    })
    .populate({
      path: "student",
      model: User,
    })
    .lean();
  return replaceMongoIdInArray(enrollment);
};

export const addEnrollment = async (student, course, transactionId, method) => {
  const enrollmentData = {
    student,
    course,
    transactionId,
    method,
    enrollment_date: Date.now(),
  };
  // return enrollmentData;
  const isExist = await Enrollment.findOne({ transactionId });
  if (!isExist) {
    await Enrollment.create(enrollmentData);
    return { success: true };
  } else {
    return { success: false, message: "Invalid/Duplicate tnxId!!!" };
  }
};
