"use server";

import { Lesson } from "@/models/lesson-model";
import { Module } from "@/models/module-model";

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
