import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const userId = req.cookies.get("userId")?.value;

  const url = req.nextUrl.clone();

  // ✅ Case 1: Missing token or userId → clear cookies + redirect to login
  if ((!token || !userId) && url.pathname.startsWith("/profile")) {
    const response = NextResponse.redirect(new URL("/login", req.url));

    // Clear both cookies to ensure clean state
    response.cookies.set("token", "", { maxAge: 0, path: "/" });
    response.cookies.set("userId", "", { maxAge: 0, path: "/" });

    return response;
  }

  // ✅ Case 2: Logged-in user trying to access login page → redirect to profile
  if (token && userId && url.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // ✅ Default: allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login"],
};
