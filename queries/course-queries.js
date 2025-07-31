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
  const courses = await Course.find({})
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
        path: "user",
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
  const studentLearned = enrollments.reduce(
    (acc, curr) => acc + curr?.length,
    0
  );
  const reviews = courses.reduce(
    (acc, curr) => acc + curr?.testimonials?.length,
    0
  );

  const { total, length } =
    courses
      .map((course) => course.testimonials.map((item) => item.rating))
      .flat()
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
    studentLearned,
    reviews,
    avgRatings: total / length,
  };
}

export async function getCoursesDataByInstructorId(instructorId) {
  const courses = await Course.find({ instructor: instructorId }).lean();
  return replaceMongoIdInArray(courses);
}
