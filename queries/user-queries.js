import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/models/user-model";
import bcrypt from "bcrypt";

export const getAUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("-password -__v").lean();
  return user ? replaceMongoIdInObject(user) : user;
};

export const validateCurrentPassword = async (email, password) => {
  const user = await User.findOne({ email }).select("password").lean();
  const isMatch = bcrypt.compareSync(password, user?.password);
  return isMatch;
};
