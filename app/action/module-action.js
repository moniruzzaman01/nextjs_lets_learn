"use server";

import { Course } from "@/models/course-model";
import { Module } from "@/models/module-model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

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

export const reorderModules = async (updatedOrders) => {
  try {
    const response = await Promise.all(
      updatedOrders.map(async (item) => {
        await Module.findByIdAndUpdate(item._id, { order: item.order });
      })
    );
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAModule = async (moduleId, moduleData, courseId) => {
  try {
    const response = await Module.findByIdAndUpdate(moduleId, moduleData);
    if (courseId) revalidatePath(`/dashboard/courses/${courseId}`);
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteAModule = async (moduleId, courseId) => {
  try {
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { modules: new mongoose.Types.ObjectId(moduleId) },
      },
      { new: true }
    );
    if (updateCourse.modules.includes(moduleId)) {
      throw new Error("Failed to delete the module from the course!!!");
    }
    const isDeleted = await Module.findByIdAndDelete(moduleId);
    revalidatePath(`/dashboard/courses/${courseId}`);
    revalidatePath(`/dashboard/courses`);
    return isDeleted ? { success: true } : { success: false };
  } catch (error) {
    throw new Error(error);
  }
};
