import { notFound } from "next/navigation";
import { getCardBySubdomain, incrementViewCount } from "@/lib/db";
import ModernCard from "@/templates/cards/ModernCard";
import ElegantCard from "@/templates/cards/ElegantCard";
import VibrantCard from "@/templates/cards/VibrantCard";
import PeacefulCard from "@/templates/cards/PeacefulCard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Template component mapping
const TEMPLATE_MAP: Record<string, any> = {
    modern: ModernCard,
    minimal: ModernCard,
    professional: ModernCard,
    elegant: ElegantCard,
    vibrant: VibrantCard,
    peaceful: PeacefulCard,
};

export default async function CardPage(props: { params: Promise<{ domain: string }> }) {
    const params = await props.params;
    const domain = params.domain;

    // Fetch card data from Firestore
    const card = await getCardBySubdomain(domain);

    // If card doesn't exist, show 404
    if (!card) {
        notFound();
    }

    // Increment view count asynchronously
    incrementViewCount(domain).catch(err => console.error("View count error:", err));

    // Select the correct template component
    const TemplateComponent = TEMPLATE_MAP[card.templateId || "modern"] || ModernCard;

    // Render the business card with the selected template
    return (
        <div style={{ minHeight: "100vh" }}>
            <TemplateComponent card={card} isMobile={false} />
        </div>
    );
}
