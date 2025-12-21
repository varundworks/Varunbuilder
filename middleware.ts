import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!api|_next|favicon.ico).*)"],
};

export default function middleware(req: NextRequest) {
    const host = req.headers.get("host");
    if (!host) return NextResponse.next();

    const hostname = host.toLowerCase();
    const url = req.nextUrl.clone();

    // Root redirect safeguard
    if (url.pathname === "/") {
        url.pathname = "/home";
        return NextResponse.rewrite(url);
    }

    // Vercel subdomains
    if (hostname.endsWith(".vercel.app")) {
        const parts = hostname.replace(".vercel.app", "").split(".");
        if (parts.length > 1) {
            url.pathname = `/${parts[0]}${url.pathname}`;
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}
