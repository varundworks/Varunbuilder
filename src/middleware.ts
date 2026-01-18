import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  console.log("🧠 [MIDDLEWARE IS RUNNING!]", { hostname, pathname });

  // Skip static files and API
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes("favicon")) {
    return NextResponse.next();
  }

  // Skip /home
  if (pathname.startsWith("/home")) {
    console.log("⏭️ Skipping /home");
    return NextResponse.next();
  }

  // Clean hostname (remove port)
  const cleanHost = hostname.split(":")[0];
  console.log("🔍 Clean host:", cleanHost);

  let subdomain: string | null = null;

  // Extract subdomain for lvh.me
  if (cleanHost.endsWith(".lvh.me")) {
    subdomain = cleanHost.replace(".lvh.me", "");
    console.log("📍 Extracted subdomain:", subdomain);
  }

  // Extract subdomain for Vercel
  if (cleanHost.endsWith(".vercel.app")) {
    const parts = cleanHost.replace(".vercel.app", "").split(".");
    if (parts.length > 1) {
      subdomain = parts[0];
      console.log("📍 Extracted Vercel subdomain:", subdomain);
    }
  }

  // Check if valid subdomain
  if (!subdomain || subdomain === "localhost" || subdomain === "lvh" || subdomain === "www") {
    console.log("✅ Main domain, no rewrite");
    return NextResponse.next();
  }

  // Rewrite to dynamic route
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${subdomain}`;
    console.log(`🔀 REWRITING: / → /${subdomain}`);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image).*)"],
};
