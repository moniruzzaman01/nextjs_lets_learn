const { Schema, default: mongoose } = require("mongoose");

const quizsetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  isPublished: {
    required: true,
    type: Boolean,
    default: false,
  },
  quizIds: [
    {
      type: Schema.ObjectId,
      ref: "Quiz",
    },
  ],
});

export const Quizset =
  mongoose.models.Quizset ?? mongoose.model("Quizset", quizsetSchema);
