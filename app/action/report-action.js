"use server";

import { auth } from "@/auth";
import { Report } from "@/models/report-model";
import { headers } from "next/headers";

export const postAReport = async (reportData) => {
  try {
    const isExist = await Report.findOne(reportData);
    if (isExist) return null;
    const report = await Report.create(reportData);
    return JSON.parse(JSON.stringify(report));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAReport = async (updatedReportInfo) => {
  try {
    const headerList = await headers();
    const { user } =
      (await auth.api.getSession({
        headers: {
          cookie: headerList.get("cookie") || {},
        },
      })) || {};
    const query = {
      course: updatedReportInfo.courseId,
      student: user.id,
    };

    const isExist = await Report.findOne(query);
    if (!isExist) {
      const report = await Report.create({
        course: updatedReportInfo.courseId,
        student: user.id,
        totalCompletedLessons: [updatedReportInfo.lessonId],
      });
      return JSON.parse(JSON.stringify(report));
    } else {
      const isExist = await Report.findOne({
        ...query,
        totalCompletedLessons: updatedReportInfo.lessonId,
      });
      if (isExist) return null;
      const report = await Report.updateOne(query, {
        $addToSet: { totalCompletedLessons: updatedReportInfo.lessonId },
      });
      return JSON.parse(JSON.stringify(report));
    }
  } catch (error) {
    throw new Error(error);
  }
};
