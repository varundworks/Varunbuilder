import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
    ],
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = (req.headers.get("host") || "").toLowerCase();

    const searchParams = url.searchParams.toString();
    const path = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;

    /**
     * DEV domains
     */
    const isLocalhost =
        hostname === "localhost:3000" || hostname === "127.0.0.1:3000";

    const isLvh =
        hostname === "lvh.me:3000";

    /**
     * Vercel handling
     * Example:
     * - yourapp.vercel.app        → root
     * - mybrand.yourapp.vercel.app → subdomain
     */
    const vercelSuffix = ".vercel.app";
    const isVercel = hostname.endsWith(vercelSuffix);

    if (isLocalhost || isLvh) {
        // localhost & lvh.me root → builder
        if (hostname === "localhost:3000" || hostname === "lvh.me:3000" || !hostname.includes(".")) {
            return NextResponse.rewrite(new URL(`/home${path}`, req.url));
        }

        // Attempt to extract subdomain for dev
        // e.g. test.lvh.me:3000 -> test
        if (hostname.includes(".lvh.me")) {
            const subdomain = hostname.split(".")[0];
            return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
        }
    }

    if (isVercel) {
        const parts = hostname.replace(vercelSuffix, "").split(".");

        // Root domain (yourapp.vercel.app)
        // If parts is ["yourapp"], that's incorrect. hostname is "yourapp.vercel.app".
        // replace(".vercel.app", "") -> "yourapp".
        // split(".") -> ["yourapp"]. length is 1.
        // BUT on Vercel, the "root" project domain is `varunbuilder.vercel.app`.
        // If I access `varunbuilder.vercel.app`, hostname is `varunbuilder.vercel.app`.
        // replaced: `varunbuilder`. parts: `["varunbuilder"]`.
        // So it rewrites to `/home`. CORRECT.

        // If I access `mybrand.varunbuilder.vercel.app`.
        // replaced: `mybrand.varunbuilder`.
        // parts: `["mybrand", "varunbuilder"]`. length is 2.
        // It falls through to subdomain logic.

        // Subdomain (mybrand.yourapp.vercel.app)
        if (parts.length === 1) {
            return NextResponse.rewrite(new URL(`/home${path}`, req.url));
        }

        const subdomain = parts[0];
        return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
    }

    /**
     * Custom production domain
     * Example: mybrand.mysaas.com
     */
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN?.toLowerCase();

    if (rootDomain && hostname === rootDomain) {
        return NextResponse.rewrite(new URL(`/home${path}`, req.url));
    }

    if (rootDomain && hostname.endsWith(`.${rootDomain}`)) {
        const subdomain = hostname.replace(`.${rootDomain}`, "");
        return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
    }

    return NextResponse.next();
}
