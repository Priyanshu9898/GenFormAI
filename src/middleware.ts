import { auth } from "@/auth";
import { getToken, GetTokenParams } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";

// Create a custom type omitting the 'salt' property
type GetTokenParamsWithoutSalt = Omit<GetTokenParams<false>, "salt">;

export default auth(async (req: NextRequest) => {
  // req.auth
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET || "",
  } as any);

  const url = req.nextUrl;

  console.log(token);

  if (token) {
    if (
      url.pathname.startsWith("/login") ||
      url.pathname.startsWith("register")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
