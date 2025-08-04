"use server";

import { Course } from "@/models/course-model";
import { Module } from "@/models/module-model";

export const postAModule = async (moduleData) => {
  try {
    const insertResponse = await Module.create(moduleData);
    const updateResponse = await Course.findByIdAndUpdate(
      moduleData.course,
      { $push: { modules: insertResponse._id } },
      { new: true }
    );
    return JSON.parse(JSON.stringify(updateResponse));
  } catch (error) {
    throw new Error(error);
  }
};
