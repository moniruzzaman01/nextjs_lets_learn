"use server";

import { auth } from "@/auth";
import { Course } from "@/models/course-model";
import { getAUserByEmail } from "@/queries/user-queries";

export async function postACourse(course) {
  const { user } = await auth();
  const loggedInUser = await getAUserByEmail(user?.email);
  course["instructor"] = loggedInUser?.id;
  const response = await Course.create(course);
  return JSON.parse(JSON.stringify(response));
}
