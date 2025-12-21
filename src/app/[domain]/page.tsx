import { notFound } from "next/navigation";
import { getWebsiteBySubdomain } from "@/lib/db";
import TemplateRenderer from "@/components/TemplateRenderer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DomainPage(props: { params: Promise<{ domain: string }> }) {
    const params = await props.params;
    const domain = params.domain;

    // Fetch site data from in-memory store
    const site = await getWebsiteBySubdomain(domain);

    // Safe guard: If site doesn't exist or isn't published, show 404
    if (!site || site.status !== "PUBLISHED") {
        notFound(); // This shows proper Next.js 404 page
    }

    // Render the published site
    return (
        <div style={{ minHeight: "100vh" }}>
            <TemplateRenderer site={site} />

            {/* Platform Badge */}
            <div style={{
                position: "fixed",
                bottom: "1.5rem",
                right: "1.5rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "rgba(10, 10, 11, 0.9)",
                color: "white",
                borderRadius: "99px",
                fontSize: "0.7rem",
                fontWeight: 700,
                pointerEvents: "none",
                zIndex: 9999,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
            }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: site.brand.primaryColor }}></div>
                Built with SiteBuilder.io
            </div>
        </div>
    );
}
