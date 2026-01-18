import { NextRequest, NextResponse } from "next/server";

// This middleware MUST run on every request
export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";
  const { pathname } = url;

  // 🔑 Remove port (CRITICAL FOR lvh.me:3000)
  const cleanHost = hostname.split(":")[0];

  console.log("🧠 [Middleware]", { hostname, cleanHost, pathname });

  // Skip API routes and special paths (but BEFORE subdomain check)
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    console.log("⏭️ [Middleware] Skipping API/Next paths");
    return NextResponse.next();
  }

  // Skip /home explicitly
  if (pathname.startsWith("/home")) {
    console.log("⏭️ [Middleware] Skipping /home");
    return NextResponse.next();
  }

  let subdomain: string | null = null;

  // Local dev: *.lvh.me
  if (cleanHost.endsWith(".lvh.me")) {
    subdomain = cleanHost.replace(".lvh.me", "");
  }

  // Vercel: subdomain.app.vercel.app
  if (cleanHost.endsWith(".vercel.app")) {
    const parts = cleanHost.replace(".vercel.app", "").split(".");
    if (parts.length > 1) {
      subdomain = parts[0];
    }
  }

  // Ignore root domains
  if (
    !subdomain ||
    subdomain === "www" ||
    subdomain === "localhost" ||
    subdomain === "lvh"
  ) {
    console.log("✅ [Middleware] Main domain - showing landing page");
    return NextResponse.next();
  }

  // Rewrite subdomain requests to /[domain] route
  if (pathname === "/") {
    console.log(`🔀 [Middleware] REWRITING: / → /${subdomain}`);
    url.pathname = `/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  console.log("✅ [Middleware] Path not / , continuing");
  return NextResponse.next();
}
