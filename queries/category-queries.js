import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { dbConnect } from "@/service/mongo";

export async function getAllCategories() {
  await dbConnect();
  const categories = await Category.find({}).lean();
  return replaceMongoIdInArray(categories);
}
