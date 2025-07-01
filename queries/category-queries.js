import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/models/category-model";

export async function getAllCategories() {
  const categories = await Category.find({}).lean();
  return replaceMongoIdInArray(categories);
}
