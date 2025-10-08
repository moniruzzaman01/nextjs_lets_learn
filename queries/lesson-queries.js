import { Lesson } from "@/models/lesson-model";
import { dbConnect } from "@/service/mongo";

export const getALessonById = async (lessonId) => {
  await dbConnect();
  const lesson = await Lesson.findById(lessonId).lean();
  return lesson;
};
