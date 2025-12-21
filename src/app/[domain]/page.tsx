import { notFound } from "next/navigation";
import { getWebsiteBySubdomain } from "@/lib/db";
import TemplateRenderer from "@/components/TemplateRenderer";

export const dynamic = "force-dynamic";

export default async function TenantPage(props: { params: Promise<{ domain: string }> }) {
    const params = await props.params;
    const domain = params.domain;

    // 1. Fetch site data from our "database"
    const site = await getWebsiteBySubdomain(domain);

    // 2. Strict validation: Must exist and be PUBLISHED
    if (!site || site.status !== "PUBLISHED") {
        return notFound();
    }

    // 3. Render the public site using the configured template
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
