import { replaceMongoIdInObject } from "@/lib/convertData";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

export const getAUserByEmail = async (email) => {
  try {
    await dbConnect();
    const user = await mongoose.connection.db
      ?.collection("user")
      .findOne({ email });
    return user ? replaceMongoIdInObject(user) : user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAUserById = async (id) => {
  try {
    await dbConnect();
    const user = await mongoose.connection.db?.collection("user").findById(id);
    return user ? replaceMongoIdInObject(user) : user;
  } catch (error) {
    throw new Error(error.message);
  }
};
