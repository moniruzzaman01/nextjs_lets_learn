import { auth } from "@/auth";
import { getAUserByEmail } from "@/queries/user-queries";
import { dbConnect } from "@/service/mongo";

import { NextResponse } from "next/server";

export const GET = async () => {
  const { user } = (await auth()) || {};
  if (!user) {
    return NextResponse.json({ message: "Unauthorize!!!" }, { status: 401 });
  }
  await dbConnect();
  const userInfo = await getAUserByEmail(user?.email);
  return NextResponse.json(userInfo, { status: 200 });
};
