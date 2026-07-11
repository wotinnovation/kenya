import { NextResponse, type NextRequest } from "next/server";
import { AUTH_TOKEN_COOKIE } from "@/graphql/authToken";

const PROTECTED_PATHS = [
  "/my-account",
  "/my-account-address",
  "/my-account-edit",
  "/my-account-orders",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
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
  matcher: [
    "/my-account",
    "/my-account-address",
    "/my-account-edit",
    "/my-account-orders",
  ],
};
