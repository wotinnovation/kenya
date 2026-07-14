import { NextResponse, type NextRequest } from "next/server";
import { AUTH_TOKEN_COOKIE } from "@/graphql/authToken";

const PROTECTED_ROOT = "/account";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected =
    pathname === PROTECTED_ROOT || pathname.startsWith(`${PROTECTED_ROOT}/`);
  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("login", "required");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/account/:path*"],
};
