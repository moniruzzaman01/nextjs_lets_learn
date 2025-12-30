import mongoose, { Schema } from "mongoose";
import { Quizset } from "./quizset-model";
import { Category } from "./category-model";
import { User } from "./user-model";
import { Testimonial } from "./testimonial-model";
import { Module } from "./module-model";

const courseSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    thumbnail: {
      type: String,
      default: "https://i.ibb.co.com/39GW4q16/course.png",
    },
    modules: [{ type: Schema.ObjectId, ref: Module }],
    price: {
      required: true,
      default: 0,
      type: Number,
    },
    category: {
      type: Schema.ObjectId,
      ref: Category,
    },
    instructor: {
      type: Schema.ObjectId,
      ref: User,
    },
    testimonials: [
      {
        type: Schema.ObjectId,
        ref: Testimonial,
      },
    ],
    learning: {
      type: [String],
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);
export const Course =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
