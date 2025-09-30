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

export const addAQuizset = async (
  quizsetData = {
    title: "Python Basics Quiz Set",
    description: "Test your knowledge about Python fundamentals.",
    mark: 15,
    slug: "python-basics-quiz",
    status: "active",
    quizIds: [],
  }
) => {
  try {
    const quizset = await Quizset.create(quizsetData);
    return quizset;
  } catch (error) {
    throw new Error(error);
  }
};
