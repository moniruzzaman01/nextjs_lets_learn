import { replaceMongoIdInArray } from "@/lib/convertData";
import { Quizset } from "@/models/quizset-model";

export const getAllQuizsets = async () => {
  try {
    const quizsets = await Quizset.find({}).lean();
    return replaceMongoIdInArray(quizsets);
  } catch (error) {
    throw new Error(error);
  }
};
