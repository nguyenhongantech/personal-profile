import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("admin_auth");
    if (!cookie || cookie.value !== "1") {
      // allow navigation to admin to show login page (handled client side),
      // but block API writes without the cookie (handled in route.ts)
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
