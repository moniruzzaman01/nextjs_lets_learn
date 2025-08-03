import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module-model";
import { Testimonial } from "@/models/testimonial-model";
import { User } from "@/models/user-model";
import { getEnrollmentsByCourseId } from "./enrollment-queries";

export async function getAllCourses() {
  const courses = await Course.find({ isPublished: true })
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInArray(courses);
}

export async function getACourse(courseId) {
  const courses = await Course.findById(courseId)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "student",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInObject(courses);
}

export async function getCoursesByInstructorId(instructorId) {
  const courses = await Course.find({ instructor: instructorId })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .lean();
  const enrollments = await Promise.all(
    courses.map(async (course) => await getEnrollmentsByCourseId(course._id))
  );
  const { studentLearned, totalRevinue } = enrollments.reduce(
    (acc, curr) => {
      if (curr?.length) {
        const temp = curr?.length * curr[0]?.course?.price;
        acc.totalRevinue += temp;
      }
      acc.studentLearned += curr?.length;
      return acc;
    },
    { studentLearned: 0, totalRevinue: 0 }
  );
  const reviews = courses.reduce(
    (acc, curr) => acc + curr?.testimonials?.length,
    0
  );
  const { total, length } =
    courses
      .map((course) => course.testimonials)
      .flat()
      .map((item) => item.ratings)
      .reduce(
        (acc, curr) => {
          acc.total += curr;
          acc.length += 1;

          return acc;
        },
        { total: 0, length: 0 }
      ) || {};

  return {
    courses: courses?.length || 0,
    totalRevinue,
    studentLearned,
    reviews,
    avgRatings: reviews && (total / length).toFixed(2),
  };
}

export async function getCoursesDataByInstructorId(instructorId) {
  const courses = await Course.find({ instructor: instructorId })
    .select("-__v -createdAt -updatedAt")
    .lean();
  return replaceMongoIdInArray(JSON.parse(JSON.stringify(courses)));
}
