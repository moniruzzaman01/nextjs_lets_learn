import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/models/user-model";

export const getAUserByEmail = async (email) => {
  const user = await User.findOne({ email })
    .select("firstName lastName email role _id")
    .lean();
  return replaceMongoIdInObject(user);
};
