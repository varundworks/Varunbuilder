import { BusinessCard, FestivalGreeting, Website } from "./types";
import { db } from "./firebase";
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    updateDoc, 
    query, 
    where,
    serverTimestamp,
    Timestamp
} from "firebase/firestore";

/**
 * DATABASE ABSTRACTION LAYER - VSTUDIO
 * 
 * This file manages business cards, greetings, and festivals using Firebase Firestore.
 * Collections:
 * - business_cards: Stores all published business cards
 * - festival_greetings: Festival/event templates
 * - websites: Legacy support
 */

// SEED DATA (will be inserted into Firestore if not exists)
const SEED_CARDS = [
    {
        id: "demo",
        subdomain: "demo",
        templateId: "modern",
        name: "Rajesh Kumar",
        title: "Digital Marketing Consultant",
        company: "Growth Strategies India",
        category: "Digital Marketing",
        yearOfEst: "2021",
        natureOfBusiness: "Digital Visiting Card + Daily Greetings Posters",
        tagline: "Helping Businesses Grow Online",
        bio: "10+ years of experience in digital marketing, SEO, and social media management. Specialized in helping small and medium businesses establish their online presence.",
        phones: ["+91 98765 43210", "+91 87654 32109"],
        email: "rajesh@growthstrategies.in",
        whatsapp: "+919876543210",
        website: "https://growthstrategies.in",
        address: "MG Road",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        pincode: "560001",
        profilePhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
        companyLogo: "",
        coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop",
        primaryColor: "#6366f1",
        secondaryColor: "#0f172a",
        socialLinks: {
            facebook: "https://facebook.com/rajeshkumar",
            instagram: "https://instagram.com/rajesh_marketing",
            linkedin: "https://linkedin.com/in/rajeshkumar",
            twitter: "https://twitter.com/rajeshkumar"
        },
        specialities: [
            "Knowledgeable team of professionals",
            "Complete client satisfaction",
            "On-time delivery",
            "Best Consultancy"
        ],
        features: ["SEO Optimization", "Social Media Marketing", "Google Ads", "Content Strategy", "Brand Building"],
        hours: "Mon-Sat: 9:00 AM - 6:00 PM",
        products: [
            {
                id: "p1",
                name: "Digital Visiting Card",
                description: "Professional digital business card with daily greetings",
                price: "₹500",
                image: ""
            }
        ],
        payment: {
            paytm: "+91-9876543210",
            phonepe: "+91-9876543210",
            googlepay: "+91-9876543210",
            bankName: "HDFC Bank",
            accountNumber: "1234567890",
            ifscCode: "HDFC0001234",
            upiId: "rajesh@paytm"
        },
        gallery: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
        ],
        videos: ["dQw4w9WgXcQ"],
        enableGreetings: true,
        enableContactForm: true,
        enableFeedback: true,
        enableGallery: true,
        enableProducts: true,
        enablePayment: true,
        status: "PUBLISHED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewCount: 4128
    }
];

// FESTIVALS SEED DATA
const SEED_FESTIVALS = [
    {
        id: "diwali-2026",
        name: "Diwali",
        date: "2026-10-23",
        category: "festival",
        defaultMessage: "Wishing you and your family a very Happy Diwali! May this festival of lights bring joy, prosperity, and success to your life.",
        templateIds: ["diwali-golden", "diwali-traditional"],
        isActive: true
    },
    {
        id: "newyear-2027",
        name: "New Year",
        date: "2027-01-01",
        category: "seasonal",
        defaultMessage: "Happy New Year 2027! May this year bring new opportunities, success, and happiness to you and your loved ones.",
        templateIds: ["newyear-fireworks", "newyear-elegant"],
        isActive: true
    },
    {
        id: "christmas-2026",
        name: "Christmas",
        date: "2026-12-25",
        category: "religious",
        defaultMessage: "Merry Christmas! Wishing you peace, joy, and all the best this wonderful holiday has to offer.",
        templateIds: ["christmas-snow", "christmas-classic"],
        isActive: true
    },
    {
        id: "holi-2026",
        name: "Holi",
        date: "2026-03-14",
        category: "festival",
        defaultMessage: "Happy Holi! May your life be filled with colors of joy, love, and laughter.",
        templateIds: ["holi-colors", "holi-splash"],
        isActive: true
    },
    {
        id: "eid-2026",
        name: "Eid-ul-Fitr",
        date: "2026-04-21",
        category: "religious",
        defaultMessage: "Eid Mubarak! May this special day bring peace, happiness, and prosperity to everyone.",
        templateIds: ["eid-moon", "eid-elegant"],
        isActive: true
    }
];

// Legacy websites seed data
const SEED_WEBSITES = [
    {
        id: "seed-1",
        subdomain: "architect",
        templateId: "modern",
        brand: {
            siteName: "Architect Digital",
            primaryColor: "#0ea5e9",
            secondaryColor: "#0f172a",
        },
        sections: {
            hero: {
                headline: "Building the Future of Digital Experience",
                subheadline: "We combine technical precision with creative vision to deliver world-class SaaS infrastructure.",
                ctaText: "Start My Project"
            },
            about: {
                title: "Who We Are",
                text: "A team of engineers and designers dedicated to building scalable, high-performance web applications."
            },
            services: [
                { id: "s1", title: "Cloud Strategy", description: "Navigating your migration to the edge." },
                { id: "s2", title: "Product Design", description: "User-centric interfaces that convert." }
            ],
            features: [
                { id: "f1", title: "Edge Routing", description: "Zero-latency requests worldwide." },
                { id: "f2", title: "Security First", description: "SOC2 compliant by default." }
            ],
            gallery: {
                title: "Our Work",
                items: [
                    { id: "g1", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", caption: "Server Architecture" },
                    { id: "g2", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", caption: "Data Analytics" },
                    { id: "g3", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", caption: "Automation Board" }
                ]
            },
            contact: {
                phone: "+1 (555) 000-1111",
                email: "hello@architect.io"
            }
        },
        animationsEnabled: true,
        status: "PUBLISHED",
        createdAt: new Date().toISOString(),
        sectionOrder: ["hero", "about", "services", "features", "gallery", "contact"]
    }
];

/**
 * BUSINESS CARD FUNCTIONS - FIRESTORE
 */

export async function getCardBySubdomain(subdomain: string): Promise<BusinessCard | null> {
    try {
        console.log(`[DB] Fetching card for subdomain: ${subdomain}`);
        const cardsRef = collection(db, "business_cards");
        const q = query(cardsRef, where("subdomain", "==", subdomain));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            console.log(`[DB] No card found for subdomain: ${subdomain}, checking for demo fallback`);
            // Demo fallback - return seed data
            if (subdomain === "demo") {
                console.log(`[DB] Returning demo seed data`);
                return SEED_CARDS[0] as BusinessCard;
            }
            console.log(`[DB] Subdomain ${subdomain} not found, returning null`);
            return null;
        }
        
        const docSnap = querySnapshot.docs[0];
        const cardData = { ...docSnap.data(), id: docSnap.id } as BusinessCard;
        console.log(`[DB] Card found for ${subdomain}:`, cardData.name);
        return cardData;
    } catch (error) {
        console.error(`[DB] Error fetching card for ${subdomain}:`, error);
        // Fallback to demo on error
        if (subdomain === "demo") {
            console.log(`[DB] Error occurred, returning demo seed data as fallback`);
            return SEED_CARDS[0] as BusinessCard;
        }
        return null;
    }
}

export async function isSubdomainUnique(subdomain: string): Promise<boolean> {
    try {
        const cardsRef = collection(db, "business_cards");
        const q = query(cardsRef, where("subdomain", "==", subdomain));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty;
    } catch (error) {
        console.error("Error checking subdomain:", error);
        return false;
    }
}

export async function createCard(data: Omit<BusinessCard, "id" | "createdAt" | "updatedAt">): Promise<BusinessCard> {
    try {
        console.log(`[DB] Creating card for subdomain: ${data.subdomain}`);
        const cardId = data.subdomain; // Use subdomain as document ID for easy lookup
        const cardsRef = doc(db, "business_cards", cardId);
        
        const newCard = {
            ...data,
            id: cardId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            viewCount: 0
        };
        
        console.log(`[DB] Saving card to Firestore:`, newCard.name);
        await setDoc(cardsRef, newCard);
        console.log(`[DB] Card created successfully for ${data.subdomain}`);
        return newCard as BusinessCard;
    } catch (error) {
        console.error(`[DB] Error creating card for ${data.subdomain}:`, error);
        throw new Error("Failed to create card in database");
    }
}

export async function updateCard(id: string, updates: Partial<BusinessCard>): Promise<BusinessCard | null> {
    try {
        const cardRef = doc(db, "business_cards", id);
        const cardSnap = await getDoc(cardRef);
        
        if (!cardSnap.exists()) return null;
        
        const updatedData = {
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        await updateDoc(cardRef, updatedData);
        
        const updatedSnap = await getDoc(cardRef);
        return { ...updatedSnap.data(), id: updatedSnap.id } as BusinessCard;
    } catch (error) {
        console.error("Error updating card:", error);
        return null;
    }
}

export async function incrementViewCount(subdomain: string): Promise<void> {
    try {
        const cardsRef = collection(db, "business_cards");
        const q = query(cardsRef, where("subdomain", "==", subdomain));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            const currentData = querySnapshot.docs[0].data();
            await updateDoc(docRef, {
                viewCount: (currentData.viewCount || 0) + 1
            });
        }
    } catch (error) {
        console.error("Error incrementing view count:", error);
    }
}

/**
 * FESTIVAL & GREETING FUNCTIONS
 */

export async function getActiveFestivals(): Promise<FestivalGreeting[]> {
    try {
        const festivalsRef = collection(db, "festival_greetings");
        const q = query(festivalsRef, where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return SEED_FESTIVALS;
        }
        
        return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as FestivalGreeting));
    } catch (error) {
        console.error("Error fetching festivals:", error);
        return SEED_FESTIVALS;
    }
}

export async function getTodaysFestival(): Promise<FestivalGreeting | null> {
    const today = new Date().toISOString().split('T')[0];
    try {
        const festivalsRef = collection(db, "festival_greetings");
        const q = query(
            festivalsRef, 
            where("date", "==", today),
            where("isActive", "==", true)
        );
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return SEED_FESTIVALS.find(f => f.date === today && f.isActive) || null;
        }
        
        return { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id } as FestivalGreeting;
    } catch (error) {
        console.error("Error fetching today's festival:", error);
        return SEED_FESTIVALS.find(f => f.date === today && f.isActive) || null;
    }
}

export async function getUpcomingFestivals(days: number = 30): Promise<FestivalGreeting[]> {
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    
    try {
        const festivalsRef = collection(db, "festival_greetings");
        const q = query(festivalsRef, where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        
        const festivals = querySnapshot.empty 
            ? SEED_FESTIVALS 
            : querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as FestivalGreeting));
        
        return festivals.filter(f => {
            const festivalDate = new Date(f.date);
            return festivalDate >= today && festivalDate <= futureDate && f.isActive;
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
        console.error("Error fetching upcoming festivals:", error);
        return SEED_FESTIVALS.filter(f => {
            const festivalDate = new Date(f.date);
            return festivalDate >= today && festivalDate <= futureDate && f.isActive;
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
}

/**
 * LEGACY WEBSITE FUNCTIONS (for backward compatibility)
 */

export async function getWebsiteBySubdomain(subdomain: string): Promise<Website | null> {
    try {
        const sitesRef = collection(db, "websites");
        const q = query(sitesRef, where("subdomain", "==", subdomain));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            if (subdomain !== "www" && SEED_WEBSITES[0]) {
                return {
                    ...SEED_WEBSITES[0],
                    subdomain: subdomain,
                    brand: {
                        ...SEED_WEBSITES[0].brand,
                        siteName: subdomain.charAt(0).toUpperCase() + subdomain.slice(1)
                    }
                };
            }
            return null;
        }
        
        return { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id } as Website;
    } catch (error) {
        console.error("Error fetching website:", error);
        return null;
    }
}

export async function createWebsite(data: Omit<Website, "id" | "createdAt">): Promise<Website> {
    try {
        const siteId = data.subdomain;
        const sitesRef = doc(db, "websites", siteId);
        
        const newSite = {
            ...data,
            id: siteId,
            createdAt: new Date().toISOString(),
        };

        await setDoc(sitesRef, newSite);
        return newSite as Website;
    } catch (error) {
        console.error("Error creating website:", error);
        throw new Error("Failed to create website");
    }
}

export async function updateWebsite(id: string, updates: Partial<Website>): Promise<Website | null> {
    try {
        const siteRef = doc(db, "websites", id);
        const siteSnap = await getDoc(siteRef);
        
        if (!siteSnap.exists()) return null;
        
        await updateDoc(siteRef, updates);
        
        const updatedSnap = await getDoc(siteRef);
        return { ...updatedSnap.data(), id: updatedSnap.id } as Website;
    } catch (error) {
        console.error("Error updating website:", error);
        return null;
    }
}
