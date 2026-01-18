import { NextRequest, NextResponse } from "next/server";
import { isSubdomainUnique, createCard } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { subdomain } = body;

        // 1. Validation
        if (!subdomain) {
            return NextResponse.json({ error: "Subdomain is required" }, { status: 400 });
        }

        if (!body.name || !body.phones || body.phones.length === 0 || !body.phones[0]) {
            return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
        }

        const subdomainRegex = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if (!subdomainRegex.test(subdomain)) {
            return NextResponse.json({ error: "Invalid subdomain format" }, { status: 400 });
        }

        // 2. Uniqueness Check
        const isUnique = await isSubdomainUnique(subdomain);
        if (!isUnique) {
            return NextResponse.json({ error: "This subdomain is already taken." }, { status: 409 });
        }

        // 3. Persist (Publish)
        const newCard = await createCard({
            ...body,
            status: "PUBLISHED",
        });

        // 4. Generate Public URL
        const protocol = req.headers.get("x-forwarded-proto") || "http";
        const host = req.headers.get("host") || "localhost:3001";

        let rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || host;
        if (host.includes("localhost")) {
            rootDomain = host.includes("3001") ? "lvh.me:3001" : "lvh.me:3000";
        }

        const publicUrl = `${protocol}://${subdomain}.${rootDomain}`;

        return NextResponse.json({
            success: true,
            data: newCard,
            url: publicUrl,
        });

    } catch (error) {
        console.error("Publish Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
