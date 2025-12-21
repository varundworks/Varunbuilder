import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!api|_next|favicon.ico).*)"],
};

export default function middleware(req: NextRequest) {
    const host = req.headers.get("host");
    if (!host) return NextResponse.next();

    const hostname = host.toLowerCase();
    const url = req.nextUrl.clone();

    // Handle Vercel subdomain routing
    if (hostname.endsWith(".vercel.app")) {
        // Extract subdomain: varun001.varunbuilder.vercel.app -> varun001
        const withoutVercel = hostname.replace(".vercel.app", "");
        const parts = withoutVercel.split(".");

        // If there's a subdomain (e.g., varun001.varunbuilder)
        if (parts.length > 1) {
            const subdomain = parts[0]; // Extract first part (varun001)

            // Don't rewrite if already on builder or API routes
            if (url.pathname.startsWith("/builder") ||
                url.pathname.startsWith("/api") ||
                url.pathname.startsWith("/home") ||
                url.pathname.startsWith("/preview")) {
                return NextResponse.next();
            }

            // Rewrite to /[domain] route
            url.pathname = `/${subdomain}${url.pathname}`;
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}
