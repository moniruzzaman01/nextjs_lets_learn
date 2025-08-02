import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    thumbnail: {
      type: String,
    },
    modules: [{ type: Schema.ObjectId, ref: "Module" }],
    price: {
      required: true,
      default: 0,
      type: Number,
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    instructor: {
      type: Schema.ObjectId,
      ref: "User",
    },
    quizzes: {
      required: false,
      type: Schema.ObjectId,
    },
    testimonials: [
      {
        type: Schema.ObjectId,
        ref: "Testimonial",
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
