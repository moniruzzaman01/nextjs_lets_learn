import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/models/assessment-model";
import { Report } from "@/models/report-model";

export const getAReport = async (query) => {
  const report = await Report.findOne(query)
    .populate({
      path: "quizAssessment",
      model: Assessment,
    })
    .lean();
  return report ? replaceMongoIdInObject(report) : report;
};
