import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    options: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          is_correct: {
            type: Boolean,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Quiz =
  mongoose.models.Quizzes ?? mongoose.model("Quizzes", quizSchema);
