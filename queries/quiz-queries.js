import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Quiz } from "@/models/quiz-model";
import { Quizset } from "@/models/quizset-model";

export const getAllQuizsets = async () => {
  try {
    const quizsets = await Quizset.find({}).lean();
    return replaceMongoIdInArray(quizsets);
  } catch (error) {
    throw new Error(error);
  }
};

export const getQuizzesByQuizsetId = async (quizsetId) => {
  try {
    const quizzes = await Quizset.findById(quizsetId)
      .populate({
        path: "quizIds",
        model: Quiz,
      })
      .lean();
    return replaceMongoIdInObject(quizzes);
  } catch (error) {
    throw new Error(error);
  }
};
