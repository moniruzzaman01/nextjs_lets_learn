import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/models/assessment-model";
import { Report } from "@/models/report-model";
import { dbConnect } from "@/service/mongo";

export const getAReport = async (query) => {
  await dbConnect();
  const report = await Report.findOne(query)
    .populate({
      path: "quizAssessment",
      model: Assessment,
    })
    .lean();
  const assessmentData = report?.quizAssessment?.assessments.reduce(
    (acc, curr) => {
      acc.totalQuiz += 1;
      if (curr.attempted) {
        acc.quizAttempted += 1;

        if (curr.options.find((item) => item.isCorrect && item.isSelected)) {
          acc.noOfCorrectQuiz += 1;
        }
      }

      return acc;
    },
    { totalQuiz: 0, quizAttempted: 0, noOfCorrectQuiz: 0 }
  );
  if (report) {
    report["totalQuiz"] = assessmentData?.totalQuiz;
    report["quizAttempted"] = assessmentData?.quizAttempted;
    report["noOfCorrectQuiz"] = assessmentData?.noOfCorrectQuiz;
  }

  return report ? replaceMongoIdInObject(report) : {};
};
