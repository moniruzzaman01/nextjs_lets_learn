"use server";

import { User } from "@/models/user-model";

export const updateAUserByEmail = async (userInfo) => {
  const query = { email: userInfo?.email };
  delete userInfo.email;
  await User.findOneAndUpdate(query, userInfo);
};
