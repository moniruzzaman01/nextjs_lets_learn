import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Module } from "@/models/module-model";
import { Quiz } from "@/models/quiz-model";
import { Quizset } from "@/models/quizset-model";
import { dbConnect } from "@/service/mongo";

export const getAllQuizsets = async (isPublished) => {
  await dbConnect();
  try {
    let quizsets;
    if (isPublished)
      quizsets = await Quizset.find({ isPublished: true }).lean();
    else quizsets = await Quizset.find({}).lean();
    return replaceMongoIdInArray(quizsets);
  } catch (error) {
    throw new Error(error);
  }
};

export const getQuizzesByQuizsetId = async (quizsetId) => {
  await dbConnect();
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

export const getQuizzesByModuleSlug = async (slug) => {
  try {
    const module = await Module.findOne({ slug })
      .populate({
        path: "quizset",
        model: Quizset,
        populate: {
          path: "quizIds",
          model: Quiz,
        },
      })
      .lean();

    if (!module || !module.isPublished || !module.quizset) return null;

    return replaceMongoIdInObject(module.quizset);
  } catch (error) {
    throw new Error(error);
  }
};
