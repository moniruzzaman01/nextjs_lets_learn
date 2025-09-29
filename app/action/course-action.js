"use server";

import { auth } from "@/auth";
import { Course } from "@/models/course-model";
import { getAUserByEmail } from "@/queries/user-queries";
import { revalidatePath } from "next/cache";

export async function postACourse(course) {
  try {
    const { user } = await auth();
    const loggedInUser = await getAUserByEmail(user?.email);
    course["instructor"] = loggedInUser?.id;
    const response = await Course.create(course);
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateACourse(courseId, updatedCourseData) {
  try {
    const response = await Course.findByIdAndUpdate(
      courseId,
      updatedCourseData
    );
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteACourse(courseId) {
  try {
    const response = await Course.findByIdAndDelete(courseId).lean();
    revalidatePath("/dashboard/courses");
    return response ? { success: true } : { success: false };
  } catch (error) {
    throw new Error(error);
  }
}
