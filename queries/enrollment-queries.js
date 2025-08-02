import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Enrollment } from "@/models/enrollment-model";
import { User } from "@/models/user-model";
import { getAReport } from "./report-queries";

export const getEnrollmentsByCourseId = async (courseId) => {
  const enrollments = await Enrollment.find({ course: courseId })
    .populate({
      path: "course",
      model: Course,
      select: "price",
    })
    .lean();
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

export const isAlreadyEnrolled = async (course, student) => {
  try {
    const result = await Enrollment.findOne({ course, student });
    return !!result;
  } catch (error) {
    throw new Error(error?.message);
  }
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

export const getEnrollmentStat = async (filter) => {
  const enrollments = await Enrollment.find(filter)
    .populate({
      path: "course",
      model: Course,
      select: "title modules",
    })
    .populate({
      path: "student",
      model: User,
      select: "firstName lastName email",
    })
    .lean();

  const enrollmentStat = await Promise.all(
    enrollments?.map(async (enrollment) => {
      const report = await getAReport({
        course: enrollment?.course,
        student: enrollment?.student,
      });

      enrollment["fullName"] =
        `${enrollment?.student?.firstName} ${enrollment?.student?.lastName}`;
      enrollment["email"] = enrollment?.student?.email;

      if (report?.id) {
        enrollment["quizMarks"] =
          report?.quizAssessment?.otherMarks + report?.noOfCorrectQuiz * 5;
        enrollment["progress"] =
          (report?.totalCompletedModules?.length /
            enrollment?.course?.modules?.length) *
          100;
      } else {
        enrollment["quizMarks"] = "-";
        enrollment["progress"] = "-";
      }

      return enrollment;
    })
  );

  return replaceMongoIdInArray(JSON.parse(JSON.stringify(enrollmentStat)));
};
