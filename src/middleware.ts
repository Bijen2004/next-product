import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/products", "/cart"];

export const config = {
  matcher: ["/products/:path*", "/cart"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
