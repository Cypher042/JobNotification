import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authSession = request.cookies.get("auth_session")?.value;
  const publicPaths = new Set([
    "/",
    "/internship-login",
    "/internship-register",
    "/placement-login",
    "/placement-register",
    "/placement-registration",
  ]);

  if (publicPaths.has(pathname)) {
    return NextResponse.next();
  }

  if (!authSession) {
    const landingUrl = new URL("/", request.url);
    return NextResponse.redirect(landingUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
