export type CardStatus = "DRAFT" | "PUBLISHED";

// Product/Service Item
export interface ProductItem {
    id: string;
    name: string;
    description: string;
    price?: string;
    image?: string;
}

// Payment Details
export interface PaymentDetails {
    paytm?: string;
    phonepe?: string;
    googlepay?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    upiId?: string;
    qrCode?: string; // QR code image URL
    qrCodeImage?: string; // Alternative field name
}

// Business Card Types
export interface BusinessCard {
    id: string;
    subdomain: string; // unique identifier (e.g., "john-smith")
    templateId: string; // "modern" | "minimal" | "professional" | "colorful" | "elegant"
    
    // Personal Info
    name: string;
    title: string; // Job title/designation
    company: string;
    category?: string; // Business category
    yearOfEst?: string; // Year of establishment
    natureOfBusiness?: string;
    tagline?: string; // Short catchphrase
    bio?: string; // Brief description
    
    // Contact Details
    phones: string[]; // Multiple phone numbers
    email: string;
    whatsapp?: string;
    website?: string;
    
    // Location
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    
    // Visual Identity
    profilePhoto?: string; // URL to profile image
    companyLogo?: string;
    coverImage?: string; // Background/banner image
    primaryColor: string;
    secondaryColor: string;
    
    // Social Links
    socialLinks: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
        otherLink?: string;
    };
    
    // Business Info
    specialities?: string[]; // Our specialities list
    hours?: string; // Business hours
    
    // Products & Services
    products: ProductItem[];
    
    // Features list (what we offer)
    features: string[];
    
    // Payment Info
    payment: PaymentDetails;
    
    // Media
    gallery: string[]; // Photo gallery URLs
    videos: string[]; // YouTube video IDs
    
    // Features Toggles
    enableGreetings: boolean; // Allow daily greetings
    enableContactForm: boolean;
    enableFeedback: boolean;
    enableGallery: boolean;
    enableProducts: boolean;
    enablePayment: boolean;
    
    status: CardStatus;
    createdAt: string;
    updatedAt: string;
    viewCount?: number;
}

// Festival Greeting Types
export interface FestivalGreeting {
    id: string;
    name: string; // "Diwali", "Christmas", "New Year", etc.
    date: string; // ISO date
    category: "festival" | "religious" | "national" | "seasonal";
    defaultMessage: string;
    templateIds: string[]; // Available greeting templates for this festival
    isActive: boolean;
}

export interface GreetingTemplate {
    id: string;
    festivalId: string;
    name: string; // "Golden Diwali", "Snowy Christmas"
    backgroundImage: string;
    textColor: string;
    overlayColor?: string;
    fontFamily: string;
}

// User Greeting Instance
export interface UserGreeting {
    id: string;
    cardId: string; // Reference to business card
    festivalId: string;
    templateId: string;
    customMessage?: string; // Override default message
    includeCardDetails: boolean; // Show business card info on greeting
    createdAt: string;
    shareCount: number;
}

// Legacy Website types (keeping for backward compatibility during migration)
export interface Website {
    id: string;
    subdomain: string;
    templateId: string;
    brand: {
        siteName: string;
        logoUrl?: string;
        primaryColor: string;
        secondaryColor: string;
        pageBackgroundColor?: string;
        sectionBackgroundColor?: string;
    };
    sections: any;
    sectionOrder: string[];
    animationsEnabled: boolean;
    status: CardStatus;
    createdAt: string;
}
