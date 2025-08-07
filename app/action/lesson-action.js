"use server";

import { Lesson } from "@/models/lesson-model";
import { Module } from "@/models/module-model";
import mongoose from "mongoose";
import { success } from "zod";

export const postALesson = async (lesson, moduleId) => {
  try {
    const insertResponse = await Lesson.create(lesson);
    const updateResponse = await Module.findByIdAndUpdate(
      moduleId,
      {
        $push: { lessonIds: insertResponse._id },
      },
      { new: true }
    );
    return JSON.parse(JSON.stringify(updateResponse));
  } catch (error) {
    throw new Error(error);
  }
};

export const reorderLessons = async (updatedOrders) => {
  try {
    const response = await Promise.all(
      updatedOrders.map(async (item) => {
        await Lesson.findByIdAndUpdate(item._id, { order: item.order });
      })
    );
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateALesson = async (lessonId, lesson) => {
  try {
    const response = await Lesson.findByIdAndUpdate(lessonId, lesson).lean();
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteALesson = async (lessonId, moduleId) => {
  try {
    const updateModule = await Module.findByIdAndUpdate(
      moduleId,
      {
        $pull: { lessonIds: new mongoose.Types.ObjectId(lessonId) },
      },
      { new: true }
    );
    if (updateModule.lessonIds.includes(lessonId)) {
      throw new Error("Failed to delete the lesson from this Module!!!");
    }
    const isDeleted = await Lesson.findByIdAndDelete(lessonId);
    return isDeleted ? { success: true } : { success: false };
  } catch (error) {
    throw new Error(error);
  }
};
