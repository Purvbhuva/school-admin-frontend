import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from "@/lib/admin-auth";

export function middleware(request: NextRequest) {
  const hasAccess =
    request.cookies.get(AUTH_COOKIE_NAME)?.value === AUTH_COOKIE_VALUE;

  if (hasAccess) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
