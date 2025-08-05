import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lesson-model";
import { Module } from "@/models/module-model";

export const getAModule = async (moduleId) => {
  try {
    const courseModule = await Module.findById(moduleId)
      .populate({
        path: "lessonIds",
        model: Lesson,
      })
      .lean();
    return replaceMongoIdInObject(courseModule);
  } catch (error) {
    throw new Error(error);
  }
};
