import { Lesson } from "@/models/lesson-model";
import { Module } from "@/models/module-model";
import { dbConnect } from "@/service/mongo";

export const getALessonById = async (lessonId) => {
  try {
    await dbConnect();
    const lesson = await Lesson.findById(lessonId).lean();
    return lesson;
  } catch (error) {
    throw new Error(error);
  }
};

export const getALessonByLessonSlugAndModuleSlug = async (
  lessonSlug,
  moduleSlug
) => {
  try {
    await dbConnect();
    if (!lessonSlug && !moduleSlug) return null;

    const [lesson, module] = await Promise.all([
      Lesson.findOne({ slug: lessonSlug }).select("_id video_url").lean(),
      Module.findOne({ slug: moduleSlug }).select("_id").lean(),
    ]);

    if (!lesson || !module) return null;

    return {
      lessonId: lesson._id.toString(),
      moduleId: module._id.toString(),
      video_url: lesson.video_url,
    };
  } catch (error) {
    throw new Error(error);
  }
};
