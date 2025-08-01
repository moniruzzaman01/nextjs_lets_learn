import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
  content: {
    required: true,
    type: String,
  },
  student: {
    type: Schema.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.ObjectId,
    ref: "Course",
  },
  ratings: {
    required: true,
    type: Number,
  },
});

export const Testimonial =
  mongoose.models.Testimonial ??
  mongoose.model("Testimonial", testimonialSchema);
