import { replaceMongoIdInObject } from "@/lib/convertData";
import { Module } from "@/models/module-model";

export const getAModule = async (moduleId) => {
  try {
    const courseModule = await Module.findById(moduleId).lean();
    return replaceMongoIdInObject(courseModule);
  } catch (error) {
    throw new Error(error);
  }
};
