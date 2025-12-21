import { Website } from "./types";

/**
 * DATABASE ABSTRACTION LAYER
 * 
 * This file acts as the single source of truth for data operations.
 * Currently, it uses a global in-memory store for rapid prototyping.
 * 
 * TO REPLACE WITH SUPABASE:
 * 1. Install @supabase/supabase-js
 * 2. Create a supabase client in a separate file (e.g., lib/supabase.ts)
 * 3. Update the functions below to use `supabase.from('websites')...`
 * 4. Ensure your DB schema matches the `Website` interface.
 */

const globalForDb = global as unknown as { mockWebsites: Website[] };

// Seed data with a professional example
const initialWebsites: Website[] = [
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
            contact: {
                phone: "+1 (555) 000-1111",
                email: "hello@architect.io"
            }
        },
        animationsEnabled: true,
        status: "PUBLISHED",
        createdAt: new Date().toISOString()
    }
];

export const mockWebsites = globalForDb.mockWebsites || initialWebsites;

if (process.env.NODE_ENV !== "production") {
    globalForDb.mockWebsites = mockWebsites;
}

/**
 * Fetch a website by its unique subdomain
 */
export async function getWebsiteBySubdomain(subdomain: string): Promise<Website | null> {
    // Simulate network latency (useful for testing loading states)
    await new Promise((resolve) => setTimeout(resolve, 80));

    const site = mockWebsites.find((s) => s.subdomain === subdomain);
    return site || null;
}

/**
 * Check if a subdomain is available
 */
export async function isSubdomainUnique(subdomain: string): Promise<boolean> {
    const existing = mockWebsites.find((s) => s.subdomain === subdomain);
    return !existing;
}

/**
 * Persist a new website entry
 */
export async function createWebsite(data: Omit<Website, "id" | "createdAt">): Promise<Website> {
    const newSite: Website = {
        ...data,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
    };

    mockWebsites.push(newSite);
    return newSite;
}

/**
 * Update an existing website
 */
export async function updateWebsite(id: string, updates: Partial<Website>): Promise<Website | null> {
    const index = mockWebsites.findIndex(s => s.id === id);
    if (index === -1) return null;

    mockWebsites[index] = { ...mockWebsites[index], ...updates };
    return mockWebsites[index];
}
