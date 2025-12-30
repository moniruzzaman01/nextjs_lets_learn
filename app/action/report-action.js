"use server";

import { auth } from "@/auth";
import { Report } from "@/models/report-model";
import { getAModule } from "@/queries/module-queries";
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

    const isReportExist = await Report.findOne(query);
    if (!isReportExist) {
      const report = await Report.create({
        course: updatedReportInfo.courseId,
        student: user.id,
        totalCompletedLessons: [updatedReportInfo.lessonId],
      });
      return JSON.parse(JSON.stringify(report));
    } else {
      const isLessonExist = await Report.findOne({
        ...query,
        totalCompletedLessons: updatedReportInfo.lessonId,
      });
      if (isLessonExist) return null;
      const report = await Report.updateOne(query, {
        $addToSet: { totalCompletedLessons: updatedReportInfo.lessonId },
      });
      if (report?.modifiedCount) {
        isReportExist.totalCompletedLessons.push(updatedReportInfo.lessonId);
        const module = await getAModule(updatedReportInfo.moduleId);
        const lessonsInModule = module.lessonIds.map((lesson) => lesson._id);
        const lessonsCompleted = isReportExist.totalCompletedLessons;
        const isModuleComplete = lessonsInModule.every((item) =>
          lessonsCompleted.includes(item)
        );
        if (isModuleComplete) {
          await Report.updateOne(query, {
            $addToSet: {
              totalCompletedModules: updatedReportInfo.moduleId,
            },
          });
        }
      }

      return JSON.parse(JSON.stringify(report));
    }
  } catch (error) {
    throw new Error(error);
  }
};

export async function createAssessmentReport(data) {
  try {
    let report = await Report.findOne({
      course: data.courseId,
      student: data.userId,
    });
    if (!report) {
      report = await Report.create({
        course: data.courseId,
        student: data.userId,
        quizAssessment: data.quizAssessment,
      });
    } else {
      if (!report.quizAssessment) {
        report.quizAssessment = data.quizAssessment;
        report.save();
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}
