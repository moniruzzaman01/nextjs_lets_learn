import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient("mongodb://localhost:27017/lets-learn");
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
    collections: {
      user: "my_users222",
      session: "my_sessions",
      account: "my_accounts",
      verification: "my_verifications",
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    // Define additional fields
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
      },
      bio: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      socialMedia: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      profilePicture: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      designation: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      // Add any other custom fields you need
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //   redirectURI: "http://localhost:3000/api/auth/callback", // Important: Use API route
    },
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   redirectURI: "http://localhost:3000/api/auth/callback",
    // },
  },
  callbacks: {
    signIn: (user) => {
      return user;
    },
  },
});
