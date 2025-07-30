import mongoose, { Schema } from "mongoose";

const assessmentSchema = new Schema(
  {
    assessments: [
      {
        quizId: { type: Schema.ObjectId, ref: "Quiz" },
        options: [
          {
            option: {
              type: String,
              required: true,
            },
            isCorrect: {
              type: Boolean,
              required: true,
            },
            isSelected: {
              type: Boolean,
              required: true,
            },
          },
        ],
        attempted: {
          type: Boolean,
          required: true,
        },
      },
    ],
    otherMarks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Assessment =
  mongoose.models.Assessment ?? mongoose.model("Assessment", assessmentSchema);
