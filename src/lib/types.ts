export type SiteStatus = "DRAFT" | "PUBLISHED";

export interface HeroSection {
    headline: string;
    subheadline: string;
    ctaText: string;
    primaryAction?: "phone" | "whatsapp" | "email" | "maps";
}

export interface AboutSection {
    title: string;
    text: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    icon?: string;
}

export interface GalleryItem {
    id: string;
    url: string;
    caption?: string;
}

export interface GallerySection {
    title: string;
    items: GalleryItem[];
}

export interface FeatureItem {
    id: string;
    title: string;
    description: string;
    icon?: string;
}

export interface ContactSection {
    phone: string;
    email: string;
    whatsapp?: string;
    address?: string;
    googleMapsUrl?: string;
    showStickyContact?: boolean;
}

export interface WebsiteBrand {
    siteName: string;
    logoUrl?: string;
    primaryColor: string;
    secondaryColor: string;
}

export interface WebsiteSections {
    hero: HeroSection;
    about: AboutSection;
    services: ServiceItem[];
    features: FeatureItem[];
    gallery: GallerySection;
    contact: ContactSection;
}

export interface Website {
    id: string;
    subdomain: string;
    templateId: string;
    brand: WebsiteBrand;
    sections: WebsiteSections;
    sectionOrder: string[];
    animationsEnabled: boolean;
    status: SiteStatus;
    createdAt: string;
}
