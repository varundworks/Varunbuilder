import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";
    const path = url.pathname;

    // Localhost development
    if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
        return NextResponse.rewrite(new URL(`/home${path}`, req.url));
    }

    // lvh.me development
    if (hostname.includes("lvh.me")) {
        if (hostname === "lvh.me:3000") {
            return NextResponse.rewrite(new URL(`/home${path}`, req.url));
        }
        // Extract subdomain (e.g., test.lvh.me:3000 -> test)
        const subdomain = hostname.split(".")[0];
        return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
    }

    // Vercel deployment
    if (hostname.includes(".vercel.app")) {
        // Extract everything before .vercel.app
        const beforeVercel = hostname.replace(".vercel.app", "");
        const parts = beforeVercel.split(".");

        // Root: yourapp.vercel.app
        if (parts.length === 1) {
            return NextResponse.rewrite(new URL(`/home${path}`, req.url));
        }

        // Subdomain: mybrand.yourapp.vercel.app
        const subdomain = parts[0];
        return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
    }

    // Custom domain
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
    if (rootDomain) {
        if (hostname === rootDomain) {
            return NextResponse.rewrite(new URL(`/home${path}`, req.url));
        }

        if (hostname.endsWith(`.${rootDomain}`)) {
            const subdomain = hostname.replace(`.${rootDomain}`, "");
            return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
        }
    }

    // Default fallback: treat as root
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
}
