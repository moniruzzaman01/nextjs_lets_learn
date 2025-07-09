import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PUBLIC_ROUTES, ROOT } from "./lib/route";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl, auth } = req;
  const isAuthenticate = !!auth;

  const isPublicRoute =
    PUBLIC_ROUTES.find((item) => nextUrl?.pathname?.startsWith(item)) ||
    nextUrl?.pathname === ROOT;
  console.log("------nexturl", nextUrl.pathname);
  console.log("------ispublic", isPublicRoute);

  if (!isAuthenticate && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
