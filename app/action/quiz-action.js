"use server";

import { Quizset } from "@/models/quizset-model";

export const addAQuizset = async (quizsetData) => {
  try {
    const quizset = await Quizset.create(quizsetData);
    return JSON.parse(JSON.stringify(quizset));
  } catch (error) {
    throw new Error(error);
  }
};
