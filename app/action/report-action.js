"use server";

import { Report } from "@/models/report-model";

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
