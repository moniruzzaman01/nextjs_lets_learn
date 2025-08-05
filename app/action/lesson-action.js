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
