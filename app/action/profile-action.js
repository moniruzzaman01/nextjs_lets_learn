"use server";

import { User } from "@/models/user-model";
import { validateCurrentPassword } from "@/queries/user-queries";
import bcrypt from "bcrypt";

export const updateAUserByEmail = async (userInfo) => {
  const query = { email: userInfo?.email };
  delete userInfo.email;
  await User.findOneAndUpdate(query, userInfo);
};

export const updatePassword = async (email, passwords) => {
  const { oldPassword, newPassword } = passwords;
  //validate the old password
  const isValid = await validateCurrentPassword(email, oldPassword);
  if (!isValid) {
    throw new Error("Current password is wrong!!!");
  }

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
    await User.findOneAndUpdate({ email }, contactInfo);
  } catch (error) {
    throw new Error(error?.message);
  }
};
