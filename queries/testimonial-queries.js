import mongoose from "mongoose";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/models/testimonial-model";
import { dbConnect } from "@/service/mongo";
// import { User } from "@/models/user-model";
// import { Course } from "@/models/course-model";

export const getTestimonialsByCourseId = async (course) => {
  await dbConnect();
  //   const testimonials = await Testimonial.find({ course })
  //     .populate({
  //       path: "course",
  //       model: Course,
  //       select: "title",
  //     })
  //     .populate({
  //       path: "student",
  //       model: User,
  //       select: "firstName lastName",
  //     })
  //     .lean();
  const testimonials = await Testimonial.aggregate([
    { $match: { course: new mongoose.Types.ObjectId(course) } },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "course",
      },
    },
    { $unwind: "$course" },

    {
      $lookup: {
        from: "users",
        localField: "student",
        foreignField: "_id",
        as: "student",
      },
    },
    { $unwind: "$student" },

    {
      $project: {
        "course.title": 1,
        content: 1,
        ratings: 1,
        "student.firstName": 1,
        "student.lastName": 1,
        "student.fullName": {
          $concat: ["$student.firstName", " ", "$student.lastName"],
        },
      },
    },
  ]);
  return replaceMongoIdInArray(JSON.parse(JSON.stringify(testimonials)));
};
