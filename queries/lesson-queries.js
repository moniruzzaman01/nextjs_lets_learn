import { Lesson } from "@/models/lesson-model";

export const getALessonById = async (lessonId) => {
  const lesson = await Lesson.findById(lessonId).lean();
  return lesson;
};
