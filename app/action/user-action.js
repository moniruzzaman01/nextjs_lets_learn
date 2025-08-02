"use server";

import { Course } from "@/models/course-model";

export async function postACourse(course) {
  const response = await Course.create(course);
  return JSON.parse(JSON.stringify(response));
}
