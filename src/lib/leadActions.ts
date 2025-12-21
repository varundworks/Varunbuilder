import { ContactSection, HeroSection } from "./types";

export const getCtaHref = (hero: HeroSection, contact: ContactSection) => {
    switch (hero.primaryAction) {
        case 'phone':
            return `tel:${contact.phone}`;
        case 'whatsapp':
            return `https://wa.me/${contact.whatsapp?.replace(/[^0-9]/g, '')}`;
        case 'email':
            return `mailto:${contact.email}`;
        case 'maps':
            return contact.googleMapsUrl || '#contact';
        default:
            return '#about';
    }
};

export const getGoogleMapsEmbedUrl = (url?: string) => {
    if (!url) return null;

    // Remove whitespace
    url = url.trim();

    // 1. If it's an iframe tag, extract the src
    if (url.startsWith('<iframe')) {
        const match = url.match(/src="([^"]+)"/);
        if (match) {
            let src = match[1];
            // Ensure embed mode
            if (!src.includes('output=embed') && !src.includes('google.com/maps/embed')) {
                src += (src.includes('?') ? '&' : '?') + 'output=embed';
            }
            return src;
        }
    }

    // 2. If it's already an embed URL, return it as is
    if (url.includes('google.com/maps/embed') || url.includes('output=embed')) {
        return url;
    }

    // 3. For any other input (address, share link, etc.), use the search query embed
    // We use the most minimal set of parameters to avoid "custom content" errors
    // &iwloc=near or &iwloc=A can sometimes cause issues with mobile links
    const cleanAddress = url.replace(/https?:\/\//, ''); // Strip protocol if user pasted a link into an address field
    return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
};
