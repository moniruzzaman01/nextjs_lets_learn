import { replaceMongoIdInObject } from "@/lib/convertData";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const getAUserByEmail = async (email) => {
  const user = await mongoose.connection.db
    .collection("user")
    .findOne({ email });
  // .select("-password -__v")
  // .lean();
  return user ? replaceMongoIdInObject(user) : user;
};

export const getAUserById = async (id) => {
  const user = await mongoose.connection.db.collection("user").findById(id);
  // .select("-password -__v")
  // .lean();
  return user ? replaceMongoIdInObject(user) : user;
};

export const validateCurrentPassword = async (email, password) => {
  const user = await mongoose.connection.db
    .collection("user")
    .findOne({ email })
    .select("password")
    .lean();
  const isMatch = bcrypt.compareSync(password, user?.password);
  return isMatch;
};
