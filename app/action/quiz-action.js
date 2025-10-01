"use server";

import { Quiz } from "@/models/quiz-model";
import { Quizset } from "@/models/quizset-model";

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
