import dynamic from "next/dynamic";
import { Website } from "@/lib/types";

// Dynamically import templates
const ModernTemplate = dynamic(() => import("@/templates/Modern"));
const MinimalTemplate = dynamic(() => import("@/templates/Minimal"));
const ProfessionalTemplate = dynamic(() => import("@/templates/Professional"));
const PlayfulTemplate = dynamic(() => import("@/templates/Playful"));
const DarkTemplate = dynamic(() => import("@/templates/Dark"));

interface TemplateRendererProps {
    site: Website;
    isMobile?: boolean; // New prop to help templates adjust
}

export default function TemplateRenderer({ site, isMobile = false }: TemplateRendererProps) {
    const { templateId } = site;
    const props = { site, isMobile };

    switch (templateId) {
        case "modern":
            return <ModernTemplate {...props} />;
        case "minimal":
            return <MinimalTemplate {...props} />;
        case "professional":
            return <ProfessionalTemplate {...props} />;
        case "playful":
            return <PlayfulTemplate {...props} />;
        case "dark":
            return <DarkTemplate {...props} />;
        default:
            return <ModernTemplate {...props} />;
    }
}
