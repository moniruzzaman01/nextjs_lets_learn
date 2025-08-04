import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  isPublished: {
    required: true,
    default: false,
    type: Boolean,
  },
  slug: {
    required: true,
    type: String,
  },
  course: {
    ref: "Course",
    type: Schema.ObjectId,
  },
  lessonIds: {
    ref: "Lesson",
    type: [Schema.ObjectId],
  },
  duration: {
    type: Number,
  },
  order: {
    required: true,
    type: Number,
  },
});

export const Module =
  mongoose.models.Module ?? mongoose.model("Module", moduleSchema);
