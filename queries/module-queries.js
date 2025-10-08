import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lesson-model";
import { Module } from "@/models/module-model";
import { dbConnect } from "@/service/mongo";

export const getAModule = async (moduleId) => {
  await dbConnect();
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
