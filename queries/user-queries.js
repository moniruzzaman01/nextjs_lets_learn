import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/models/user-model";

export const getAUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("-password -__v").lean();
  return user ? replaceMongoIdInObject(user) : user;
};
