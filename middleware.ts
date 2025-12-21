import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!api|_next|favicon.ico).*)"],
};

export default function middleware(req: NextRequest) {
    try {
        const host = req.headers.get("host");
        if (!host) return NextResponse.next();

        const hostname = host.toLowerCase();
        const url = req.nextUrl.clone();

        // ---------- LOCAL DEV ----------
        if (hostname === "localhost:3000") {
            if (url.pathname === "/") {
                url.pathname = "/home";
                return NextResponse.rewrite(url);
            }
            return NextResponse.next();
        }

        // ---------- VERCEL ----------
        if (hostname.endsWith(".vercel.app")) {
            const parts = hostname.replace(".vercel.app", "").split(".");

            // Root app: yourapp.vercel.app
            if (parts.length === 1) {
                if (url.pathname === "/") {
                    url.pathname = "/home";
                    return NextResponse.rewrite(url);
                }
                return NextResponse.next();
            }

            // Subdomain: brand.yourapp.vercel.app
            const subdomain = parts[0];
            url.pathname = `/${subdomain}${url.pathname}`;
            return NextResponse.rewrite(url);
        }

        return NextResponse.next();
    } catch {
        return NextResponse.next();
    }
}
