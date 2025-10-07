import { replaceMongoIdInObject } from "@/lib/convertData";
import mongoose from "mongoose";

export const getAUserByEmail = async (email) => {
  const user = await mongoose.connection.db
    .collection("user")
    .findOne({ email });
  return user ? replaceMongoIdInObject(user) : user;
};

export const getAUserById = async (id) => {
  const user = await mongoose.connection.db.collection("user").findById(id);
  return user ? replaceMongoIdInObject(user) : user;
};
