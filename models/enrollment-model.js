import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema(
  {
    course_id: { type: Schema.ObjectId, ref: "Course" },
    student_id: { type: Schema.ObjectId, ref: "User" },
    method: {
      required: true,
      type: String,
    },
    transactionId: {
      required: true,
      type: String,
    },
    enrollment_date: {
      required: true,
      type: Date,
    },
    completion_date: {
      required: false,
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Enrollment =
  mongoose.models.Enrollment ?? mongoose.model("Enrollment", enrollmentSchema);
