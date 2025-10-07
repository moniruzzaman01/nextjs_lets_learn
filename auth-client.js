import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});

// Helper hooks
export const { signIn, signUp, signOut, useSession } = authClient;
