import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./models/user-model";
import bcrypt from "bcrypt";
import authConfig from "./auth.config.js"; // make sure this is .js
import google from "next-auth/providers/google";

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens?.access_token,
      expires_in: Date.now() + refreshedTokens?.expires_in * 1000,
      refresh_token: refreshedTokens?.refresh_token,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
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
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     if (user && account) {
  //       token.access_token = account?.access_token;
  //       token.refresh_token = account?.refresh_token;
  //       token.id_token = account?.id_token;
  //       token.expires_in = Date.now() + account?.expires_in * 1000;
  //     }

  //     if (Date.now() > token?.expires_in) {
  //       return console.log("token expired");
  //     }

  //     return token;
  //   },

  //   async session({ session, token }) {
  //     session.access_token = token?.access_token;
  //     return session;
  //   },
  // },
});
