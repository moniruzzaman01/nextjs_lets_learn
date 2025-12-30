"use server";

import { auth } from "@/auth";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { Assessment } from "@/models/assessment-model";
import { Quiz } from "@/models/quiz-model";
import { Quizset } from "@/models/quizset-model";
import { getQuizzesByQuizsetId } from "@/queries/quiz-queries";
import { headers } from "next/headers";
import { createAssessmentReport } from "./report-action";

export const addAQuizset = async (quizsetData) => {
  try {
    const quizset = await Quizset.create(quizsetData);
    return JSON.parse(JSON.stringify(quizset));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAQuizset = async (quizsetId, quizsetData) => {
  try {
    const updatedQuizset = await Quizset.findByIdAndUpdate(
      quizsetId,
      quizsetData
    ).lean();
    return JSON.parse(JSON.stringify(updatedQuizset));
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAQuizset = async (quizSetId) => {
  try {
    const quizset = await Quizset.findByIdAndDelete(quizSetId);
    return JSON.parse(JSON.stringify(quizset));
  } catch (error) {
    throw new Error(error);
  }
};

export const addAQuiz = async (quizData, quizSetId) => {
  try {
    const quiz = await Quiz.create(quizData);
    if (!quiz) throw new Error("Quiz addition failed!!!");
    const quizset = await Quizset.findByIdAndUpdate(quizSetId, {
      $push: { quizIds: quiz?._id },
    });
    return quizset ? true : false;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAQuiz = async (quizId, quizData) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, quizData).lean();
    return JSON.parse(JSON.stringify(updatedQuiz));
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAQuiz = async (quizId, quizSetId) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      throw new Error(`Quiz deletion failed!!!`);
    }
    const quizset = await Quizset.findByIdAndUpdate(
      quizSetId,
      {
        $pull: { quizIds: quizId },
      },
      { new: true }
    );
    return quizset ? true : false;
  } catch (error) {
    throw new Error(error);
  }
};

export const addQuizAssessment = async (
  courseId,
  moduleId,
  quizSetId,
  answers
) => {
  try {
    const quizset = await getQuizzesByQuizsetId(quizSetId);
    const quizzes = replaceMongoIdInArray(quizset.quizIds);

    const assessmentRecord = quizzes.map((quiz) => {
      const obj = {};
      obj.quizId = quiz.id;
      const found = answers.find(
        (answer) => answer.quizId.toString() === quiz.id.toString()
      );
      if (found) {
        obj.attempted = true;
      } else {
        obj.attempted = false;
      }
      const mergedOptions = quiz.options.map((option) => {
        return {
          option: option.text,
          isCorrect: option.is_correct,
          isSelected: (function () {
            const found = answers.find(
              (answer) => answer.options[0].option === option.text
            );
            if (found) {
              return true;
            } else {
              return false;
            }
          })(),
        };
      });
      obj["options"] = mergedOptions;
      return obj;
    });

    const assessmentEntry = {};
    assessmentEntry.assessments = assessmentRecord;
    assessmentEntry.otherMarks = 0;

    const assessment = await Assessment.create(assessmentEntry);

    const headerlist = await headers();
    const { user } =
      (await auth.api.getSession({
        headers: {
          cookie: headerlist.get("cookie") || "",
        },
      })) || {};

    await createAssessmentReport({
      courseId: courseId,
      userId: user.id,
      quizAssessment: assessment?._id,
    });
  } catch (error) {
    throw new Error(error);
  }
};
