import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/models/user-model";

export const POST = async (req) => {
  throw new Error("ha ha ha!");
  const { firstName, lastName, email, password, userRole } = await req.json();
  const hashedPass = bcrypt.hashSync(password, 5);
  const userData = {
    firstName,
    lastName,
    email,
    password: hashedPass,
    role: userRole,
  };
  const isExist = await User.findOne({ email }).lean();
  if (isExist) {
    return NextResponse.json(
      {
        success: false,
        message: "User already exist!",
      },
      { status: 409 }
    );
  }
  try {
    await User.create(userData);
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
};
