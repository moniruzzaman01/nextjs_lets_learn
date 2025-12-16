"use server";

import { User } from "@/models/user-model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const updateAUserByEmail = async (userInfo) => {
  const query = { email: userInfo?.email };
  delete userInfo.email;

  try {
    const response = await User.findOneAndUpdate(
      query,
      { $set: userInfo },
      { returnDocument: "after" }
    );

    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePassword = async (email, passwords) => {
  const { oldPassword, newPassword } = passwords;

  //change password
  const hashedPassword = bcrypt.hashSync(newPassword, 5);
  try {
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const updateContactInfo = async (email, contactInfo) => {
  try {
    const response = await User.findOneAndUpdate(
      { email },
      { $set: contactInfo },
      { returnDocument: "after" }
    );

    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    throw new Error(error?.message);
  }
};
