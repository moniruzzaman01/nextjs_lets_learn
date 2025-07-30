import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
  {
    totalCompletedLessons: [{ type: Schema.ObjectId, ref: "Lesson" }],
    totalCompletedModules: [{ type: Schema.ObjectId, ref: "Module" }],
    course: { type: Schema.ObjectId, ref: "Course" },
    student: { type: Schema.ObjectId, ref: "Student" },
    quizAssessment: { type: Schema.ObjectId, ref: "Assessment" },
  },
  {
    timestamps: true,
  }
);

export const Report =
  mongoose.models.Report ?? mongoose.model("Report", reportSchema);
