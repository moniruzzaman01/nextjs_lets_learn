"use server";

import { auth } from "@/auth";
import { View } from "@/models/views-model";
import mongoose from "mongoose";
import { headers } from "next/headers";

export const postAViewInfo = async (viewInfo) => {
  try {
    const headerList = await headers();
    const { user } =
      (await auth.api.getSession({
        headers: {
          cookie: headerList.get("cookie") || {},
        },
      })) || {};

    const userId = user.id;
    const lessonId = viewInfo.lesson;
    const moduleId = viewInfo.module;

    const query = {
      user: new mongoose.Types.ObjectId(userId),
      lesson: new mongoose.Types.ObjectId(lessonId),
      module: new mongoose.Types.ObjectId(moduleId),
    };
    const isExist = await View.findOne(query).lean();
    if (isExist) return null;

    viewInfo["user"] = userId;
    const result = await View.create(viewInfo);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAViewInfo = async (updatedInfo) => {
  try {
    const headerList = await headers();
    const { user } =
      (await auth.api.getSession({
        headers: {
          cookie: headerList.get("cookie") || {},
        },
      })) || {};

    const userId = user.id;
    const lessonId = updatedInfo.lesson;
    const moduleId = updatedInfo.module;
    const query = {
      user: new mongoose.Types.ObjectId(userId),
      lesson: new mongoose.Types.ObjectId(lessonId),
      module: new mongoose.Types.ObjectId(moduleId),
    };

    const view = await View.findOne(query);
    if (!view) {
      return null;
    }

    view["state"] = "completed";
    const result = await view.save();
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    throw new Error(error);
  }
};
