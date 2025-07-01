import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const connection = await mongoose.connect(
      String(process.env.mongodb_connection_string)
    );
    return connection;
  } catch (error) {
    console.error(error);
  }
}
