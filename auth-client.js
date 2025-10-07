import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

// Helper hooks
export const { signIn, signUp, signOut, useSession } = authClient;
