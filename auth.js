import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./models/user-model";
import bcrypt from "bcrypt";
import authConfig from "./auth.config.js"; // make sure this is .js

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const isMatched = bcrypt.compareSync(
              credentials?.password,
              user?.password
            );
            if (isMatched) {
              return user;
            } else {
              throw new Error("Invalid credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      },
    }),
  ],
});
