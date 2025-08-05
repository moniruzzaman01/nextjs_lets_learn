import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
  video_url: {
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
  access: {
    required: true,
    default: "private",
    type: String,
  },
  order: {
    required: true,
    type: Number,
  },
});

export const Lesson =
  mongoose.models.Lesson ?? mongoose.model("Lesson", lessonSchema);

//   {
//   "_id": {
//     "$oid": "663a0806bfe65e5778eedf35"
//   },
//   "title": "Introduction to Variables",
//   "description": "Learn the basics of variables in programming.",
//   "duration": "10:30",
//   "video_url": "https://example.com/variables_video",
//   "published": true,
//   "slug": "introduction-to-variables",
//   "access": "public"
// }
