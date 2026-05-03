import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 🔓 Public routes
  const isPublicRoute =
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup");
  // 🔒 Protected routes
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 🔒 Redirect unauthenticated users to signin
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
// Exclude static files and API routes from middleware

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};