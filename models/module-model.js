import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  status: {
    required: true,
    type: String,
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
    required: true,
    type: Number,
  },
});

export const Module =
  mongoose.models.Module ?? mongoose.model("Module", moduleSchema);
