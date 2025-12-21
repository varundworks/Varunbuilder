import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
    ],
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // 1. Get hostname (e.g. site1.localhost:3000, site2.lvh.me:3000, myapp.vercel.app)
    const hostname = req.headers.get("host") || "";

    // The root domain is the platform domain (e.g., mysaas.com or my-app.vercel.app)
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const searchParams = url.searchParams.toString();
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

    // 2. Determine if it's the root domain or a subdomain
    // We check if the hostname is exactly the root domain OR 
    // if it's a specific local dev domain like lvh.me:3000
    const isRootDomain =
        hostname === rootDomain ||
        hostname === "lvh.me:3000" ||
        hostname === "localhost:3000";

    if (isRootDomain) {
        // Route to the /home directory where the main builder lives
        return NextResponse.rewrite(new URL(`/home${path}`, req.url));
    }

    // 3. Extract the subdomain
    // This logic extracts the part before the first dot
    // e.g., "site1.localhost:3000" -> "site1"
    // e.g., "test.lvh.me:3000" -> "test"
    // e.g., "mybrand.mysaas.com" -> "mybrand"
    const subdomain = hostname.split(".")[0];

    // 4. Rewrite to the dynamic [domain] route
    return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
}
