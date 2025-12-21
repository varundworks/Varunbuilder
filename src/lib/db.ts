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

// EDGE-COMPATIBLE IN-MEMORY STORE
// Using module-level storage instead of global to work in Edge runtime
let websitesStore: Website[] = [
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
 * Fetch a website by its unique subdomain
 */
export async function getWebsiteBySubdomain(subdomain: string): Promise<Website | null> {
    // Simulate network latency (useful for testing loading states)
    await new Promise((resolve) => setTimeout(resolve, 80));

    const site = websitesStore.find((s) => s.subdomain === subdomain);

    // DEMO MODE PATCH:
    // If on Vercel (or missing persistence), and we requested a subdomain that isn't found,
    // we return the SEED site but masked as the requested subdomain.
    // This allows the user to click "Publish" -> go to "foo.vercel.app" -> see a site (even if it's the default one),
    // instead of a 404. Ideally we'd use a real DB, but this prevents the "Broken App" feeling during demo.
    if (!site && subdomain !== "www") {
        return {
            ...websitesStore[0],
            subdomain: subdomain,
            brand: {
                ...websitesStore[0].brand,
                siteName: subdomain.charAt(0).toUpperCase() + subdomain.slice(1) // Capitalize subdomain as site name
            }
        };
    }

    return site || null;
}

/**
 * Check if a subdomain is available
 */
export async function isSubdomainUnique(subdomain: string): Promise<boolean> {
    const existing = websitesStore.find((s) => s.subdomain === subdomain);
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

    websitesStore.push(newSite);
    return newSite;
}

/**
 * Update an existing website
 */
export async function updateWebsite(id: string, updates: Partial<Website>): Promise<Website | null> {
    const index = websitesStore.findIndex(s => s.id === id);
    if (index === -1) return null;

    websitesStore[index] = { ...websitesStore[index], ...updates };
    return websitesStore[index];
}
