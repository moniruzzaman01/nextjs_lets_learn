import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";

export const getAUserByEmail = async (email) => {
  try {
    await dbConnect();
    const user = await User.findOne({ email }).lean();
    return user ? replaceMongoIdInObject(user) : user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAUserById = async (id) => {
  try {
    await dbConnect();
    const user = await User.findById(id);
    return user ? replaceMongoIdInObject(user) : user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUser = async () => {
  const user = await User.find({});
  return user;
};
