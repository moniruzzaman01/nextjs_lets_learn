import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.mongodb_connection_string);
await client.connect();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "users",
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
        defaultValue: "",
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
    signIn: async (user) => {
      return user;
    },
  },
});
