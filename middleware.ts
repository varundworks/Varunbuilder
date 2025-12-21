import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};

export default function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    const host = req.headers.get("host");

    // SAFETY CHECK
    if (!host) {
      return NextResponse.next();
    }

    const hostname = host.toLowerCase();
    const pathname = url.pathname;

    // Local development
    if (hostname === "localhost:3000") {
      if (pathname === "/") {
        url.pathname = "/home";
        return NextResponse.rewrite(url);
      }
      return NextResponse.next();
    }

    // Vercel deployment
    if (hostname.endsWith(".vercel.app")) {
      const parts = hostname.replace(".vercel.app", "").split(".");

      // Root app: yourapp.vercel.app
      if (parts.length === 1) {
        if (pathname === "/") {
          url.pathname = "/home";
          return NextResponse.rewrite(url);
        }
        return NextResponse.next();
      }

      // Subdomain: site.yourapp.vercel.app
      const subdomain = parts[0];
      url.pathname = `/${subdomain}${pathname}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  } catch (error) {
    // NEVER CRASH MIDDLEWARE
    return NextResponse.next();
  }
}
