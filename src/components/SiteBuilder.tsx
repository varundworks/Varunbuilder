"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Reorder, useDragControls } from "framer-motion";
import {
    Palette, Type, Settings, Layout, ExternalLink,
    Check, Globe, ChevronRight, Loader2, Sparkles,
    Smartphone, Monitor, CheckCircle2, AlertCircle,
    Image as ImageIcon, Briefcase, Zap, Info, Phone,
    ChevronDown, ChevronUp, Upload, MousePointer2,
    Mail, MessageSquare, Trash2, Plus, GripVertical, MapPin,
    MessageCircle, Navigation, MousePointer, Star, Shield, Heart, Smile, Camera
} from "lucide-react";

export const AVAILABLE_ICONS: Record<string, any> = {
    Zap: <Zap size={16} />,
    Briefcase: <Briefcase size={16} />,
    Check: <Check size={16} />,
    CheckCircle2: <CheckCircle2 size={16} />,
    Info: <Info size={16} />,
    Phone: <Phone size={16} />,
    Mail: <Mail size={16} />,
    MessageSquare: <MessageSquare size={16} />,
    Star: <Star size={16} />,
    Globe: <Globe size={16} />,
    Layout: <Layout size={16} />,
    Smartphone: <Smartphone size={16} />,
    Shield: <Shield size={16} />,
    Heart: <Heart size={16} />,
    Smile: <Smile size={16} />,
    Camera: <Camera size={16} />,
    MapPin: <MapPin size={16} />,
    Navigation: <Navigation size={16} />,
    MousePointer: <MousePointer size={16} />,
    MousePointer2: <MousePointer2 size={16} />,
};
import TemplateRenderer from "./TemplateRenderer";
import { Website, ServiceItem, FeatureItem } from "@/lib/types";

const ReorderItem = ({
    sectionId,
    site,
    openSection,
    setOpenSection,
    updateSection,
    updateListItem,
    removeListItem,
    addListItem,
    removeSection,
    SectionHeader,
    addGalleryItem,
    updateGalleryItem,
    removeGalleryItem
}: {
    sectionId: string,
    site: Website,
    openSection: string | null,
    setOpenSection: (id: string | null) => void,
    updateSection: any,
    updateListItem: any,
    removeListItem: any,
    addListItem: any,
    removeSection: any,
    SectionHeader: any,
    addGalleryItem: any,
    updateGalleryItem: any,
    removeGalleryItem: any
}) => {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={sectionId}
            dragListener={false}
            dragControls={dragControls}
            style={{ backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0" }}
        >
            {/* Hero Editor */}
            {sectionId === "hero" && (
                <>
                    <SectionHeader id="hero" title="Hero Section" icon={<Zap size={16} />} dragControls={dragControls} />
                    <AnimatePresence>
                        {openSection === 'hero' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", backgroundColor: "#fafafa" }}>
                                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input placeholder="Headline" value={site.sections.hero.headline} onChange={e => updateSection("hero", "headline", e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #f0f0f0" }} />
                                    <textarea placeholder="Subheadline" value={site.sections.hero.subheadline} onChange={e => updateSection("hero", "subheadline", e.target.value)} rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #f0f0f0" }} />
                                    <input placeholder="CTA Text" value={site.sections.hero.ctaText} onChange={e => updateSection("hero", "ctaText", e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #f0f0f0" }} />

                                    <div style={{ marginTop: "0.5rem" }}>
                                        <label style={{ fontSize: "0.7rem", fontWeight: 800, color: "#aaa", marginBottom: "0.5rem", display: "block" }}>CTA ACTION (CLICK BEHAVIOR)</label>
                                        <select
                                            value={site.sections.hero.primaryAction || ""}
                                            onChange={e => updateSection("hero", "primaryAction", e.target.value as any)}
                                            style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #f0f0f0", fontSize: "0.85rem", backgroundColor: "#fff" }}
                                        >
                                            <option value="">Default (Scroll Down)</option>
                                            <option value="phone">📞 Direct Call</option>
                                            <option value="whatsapp">💬 WhatsApp Chat</option>
                                            <option value="email">📧 Send Email</option>
                                            <option value="maps">📍 Open Maps</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            {/* About Editor */}
            {sectionId === "about" && (
                <>
                    <SectionHeader id="about" title="About Section" icon={<Info size={16} />} dragControls={dragControls} />
                    <AnimatePresence>
                        {openSection === 'about' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", backgroundColor: "#fafafa" }}>
                                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input placeholder="About Title" value={site.sections.about.title} onChange={e => updateSection("about", "title", e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #f0f0f0" }} />
                                    <textarea placeholder="About Text" value={site.sections.about.text} onChange={e => updateSection("about", "text", e.target.value)} rows={5} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #f0f0f0" }} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            {/* Services Editor */}
            {sectionId === "services" && (
                <>
                    <SectionHeader id="services" title="Services" icon={<Briefcase size={16} />} dragControls={dragControls} />
                    <AnimatePresence>
                        {openSection === 'services' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", backgroundColor: "#fafafa" }}>
                                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    {site.sections.services.map((item, i) => (
                                        <div key={item.id} style={{ padding: "1rem", backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", position: "relative" }}>
                                            <button onClick={() => removeListItem("services", item.id)} style={{ position: "absolute", top: 8, right: 8, backgroundColor: "transparent", border: "none", color: "#ccc", cursor: "pointer" }}><Trash2 size={14} /></button>
                                            <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ccc", marginBottom: "0.5rem" }}>SERVICE 0{i + 1}</div>

                                            <div style={{ marginBottom: "1rem" }}>
                                                <label style={{ fontSize: "0.6rem", fontWeight: 800, color: "#aaa", display: "block", marginBottom: "0.25rem" }}>ICON</label>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                                                    {Object.keys(AVAILABLE_ICONS).map(iconName => (
                                                        <button
                                                            key={iconName}
                                                            onClick={() => updateListItem("services", item.id, "icon", iconName)}
                                                            style={{
                                                                padding: "0.4rem",
                                                                borderRadius: "4px",
                                                                border: item.icon === iconName ? `2px solid ${site.brand.primaryColor}` : "1px solid #eee",
                                                                backgroundColor: item.icon === iconName ? `${site.brand.primaryColor}11` : "transparent",
                                                                cursor: "pointer",
                                                                color: item.icon === iconName ? site.brand.primaryColor : "#ccc"
                                                            }}
                                                        >
                                                            {AVAILABLE_ICONS[iconName]}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <input placeholder="Service Title" value={item.title} onChange={e => updateListItem("services", item.id, "title", e.target.value)} style={{ width: "100%", padding: "0.5rem", border: "none", borderBottom: "1px solid #eee", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 700 }} />
                                            <textarea placeholder="Description" value={item.description} onChange={e => updateListItem("services", item.id, "description", e.target.value)} rows={2} style={{ width: "100%", padding: "0.5rem", border: "none", fontSize: "0.85rem", color: "#666" }} />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addListItem("services")}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "2px dashed #eee", backgroundColor: "transparent", color: "#888", fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", cursor: "pointer" }}
                                    >
                                        <Plus size={14} /> Add Service
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            {/* Features Editor */}
            {sectionId === "features" && (
                <>
                    <SectionHeader id="features" title="Features" icon={<Check size={16} />} dragControls={dragControls} />
                    <AnimatePresence>
                        {openSection === 'features' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", backgroundColor: "#fafafa" }}>
                                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    {site.sections.features.map((item, i) => (
                                        <div key={item.id} style={{ padding: "1rem", backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", position: "relative" }}>
                                            <button onClick={() => removeListItem("features", item.id)} style={{ position: "absolute", top: 8, right: 8, backgroundColor: "transparent", border: "none", color: "#ccc", cursor: "pointer" }}><Trash2 size={14} /></button>
                                            <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ccc", marginBottom: "0.5rem" }}>FEATURE 0{i + 1}</div>

                                            <div style={{ marginBottom: "1rem" }}>
                                                <label style={{ fontSize: "0.6rem", fontWeight: 800, color: "#aaa", display: "block", marginBottom: "0.25rem" }}>ICON</label>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                                                    {Object.keys(AVAILABLE_ICONS).map(iconName => (
                                                        <button
                                                            key={iconName}
                                                            onClick={() => updateListItem("features", item.id, "icon", iconName)}
                                                            style={{
                                                                padding: "0.4rem",
                                                                borderRadius: "4px",
                                                                border: item.icon === iconName ? `2px solid ${site.brand.primaryColor}` : "1px solid #eee",
                                                                backgroundColor: item.icon === iconName ? `${site.brand.primaryColor}11` : "transparent",
                                                                cursor: "pointer",
                                                                color: item.icon === iconName ? site.brand.primaryColor : "#ccc"
                                                            }}
                                                        >
                                                            {AVAILABLE_ICONS[iconName]}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <input placeholder="Feature Title" value={item.title} onChange={e => updateListItem("features", item.id, "title", e.target.value)} style={{ width: "100%", padding: "0.5rem", border: "none", borderBottom: "1px solid #eee", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 700 }} />
                                            <textarea placeholder="Description" value={item.description} onChange={e => updateListItem("features", item.id, "description", e.target.value)} rows={2} style={{ width: "100%", padding: "0.5rem", border: "none", fontSize: "0.85rem", color: "#666" }} />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addListItem("features")}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "2px dashed #eee", backgroundColor: "transparent", color: "#888", fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", cursor: "pointer" }}
                                    >
                                        <Plus size={14} /> Add Feature
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            {/* Gallery Editor */}
            {sectionId === "gallery" && (
                <>
                    <SectionHeader id="gallery" title="Image Gallery" icon={<ImageIcon size={16} />} dragControls={dragControls} />
                    <AnimatePresence>
                        {openSection === 'gallery' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", backgroundColor: "#fafafa" }}>
                                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    <input
                                        placeholder="Gallery Title (e.g. Our Portfolio)"
                                        value={site.sections.gallery.title}
                                        onChange={e => updateSection("gallery", "title", e.target.value)}
                                        style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #f0f0f0", fontWeight: 700 }}
                                    />

                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        {site.sections.gallery.items.map((item, i) => (
                                            <div key={item.id} style={{ padding: "1rem", backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "12px", position: "relative" }}>
                                                <button onClick={() => removeGalleryItem(item.id)} style={{ position: "absolute", top: 8, right: 8, backgroundColor: "#ef4444", border: "none", color: "#fff", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 1 }}><Trash2 size={12} /></button>

                                                <img src={item.url} alt="Preview" style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "6px", marginBottom: "0.5rem" }} />

                                                <input
                                                    placeholder="Image URL"
                                                    value={item.url}
                                                    onChange={e => updateGalleryItem(item.id, "url", e.target.value)}
                                                    style={{ width: "100%", padding: "0.4rem", border: "none", borderBottom: "1px solid #eee", fontSize: "0.7rem", marginBottom: "0.25rem" }}
                                                />
                                                <input
                                                    placeholder="Caption (Optional)"
                                                    value={item.caption || ""}
                                                    onChange={e => updateGalleryItem(item.id, "caption", e.target.value)}
                                                    style={{ width: "100%", padding: "0.4rem", border: "none", fontSize: "0.75rem", color: "#666" }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={addGalleryItem}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "2px dashed #eee", backgroundColor: "transparent", color: "#888", fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", cursor: "pointer" }}
                                    >
                                        <Plus size={14} /> Add Image
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            {/* Contact Editor */}
            {sectionId === "contact" && (
                <>
                    <SectionHeader id="contact" title="Contact Info" icon={<Phone size={16} />} dragControls={dragControls} />
                    <AnimatePresence>
                        {openSection === 'contact' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", backgroundColor: "#fafafa" }}>
                                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                                        <Phone size={14} color="#aaa" />
                                        <input placeholder="Phone Number" value={site.sections.contact.phone} onChange={e => updateSection("contact", "phone", e.target.value)} style={{ flex: 1, border: "none", fontSize: "0.9rem", outline: "none" }} />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                                        <Mail size={14} color="#aaa" />
                                        <input placeholder="Email Address" value={site.sections.contact.email} onChange={e => updateSection("contact", "email", e.target.value)} style={{ flex: 1, border: "none", fontSize: "0.9rem", outline: "none" }} />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                                        <MessageCircle size={14} color="#aaa" />
                                        <input placeholder="WhatsApp (e.g. 1234567890)" value={site.sections.contact.whatsapp || ""} onChange={e => updateSection("contact", "whatsapp", e.target.value)} style={{ flex: 1, border: "none", fontSize: "0.9rem", outline: "none" }} />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                                        <MapPin size={14} color="#aaa" />
                                        <input placeholder="Physical Address" value={site.sections.contact.address || ""} onChange={e => updateSection("contact", "address", e.target.value)} style={{ flex: 1, border: "none", fontSize: "0.9rem", outline: "none" }} />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                                        <Navigation size={14} color="#aaa" />
                                        <input
                                            placeholder="Address OR Google Maps Link"
                                            value={site.sections.contact.googleMapsUrl || ""}
                                            onChange={e => updateSection("contact", "googleMapsUrl", e.target.value)}
                                            style={{ flex: 1, border: "none", fontSize: "0.9rem", outline: "none" }}
                                        />
                                    </div>
                                    <p style={{ fontSize: "0.65rem", color: "#aaa", marginTop: "-0.5rem", paddingLeft: "0.5rem" }}>
                                        Tip: Paste your physical address or the "Embed map" code from Google Maps.
                                    </p>

                                    <div
                                        onClick={() => updateSection("contact", "showStickyContact", !site.sections.contact.showStickyContact)}
                                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", backgroundColor: "#fff", border: "1px solid #f0f0f0", borderRadius: "8px", cursor: "pointer", marginTop: "0.5rem" }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem", fontWeight: 600 }}>
                                            <MousePointer size={14} color={site.brand.primaryColor} />
                                            Sticky Contact Button (Mobile)
                                        </div>
                                        <div style={{ width: "32px", height: "18px", backgroundColor: site.sections.contact.showStickyContact ? site.brand.primaryColor : "#ddd", borderRadius: "99px", position: "relative" }}>
                                            <div style={{ position: "absolute", top: "2px", left: site.sections.contact.showStickyContact ? "16px" : "2px", width: "14px", height: "14px", backgroundColor: "#fff", borderRadius: "50%", transition: "0.2s" }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </Reorder.Item>
    );
};

const TEMPLATES = [
    { id: "modern", name: "Modern", icon: <Sparkles size={16} /> },
    { id: "minimal", name: "Minimal", icon: <Type size={16} /> },
    { id: "professional", name: "Professional", icon: <Layout size={16} /> },
    { id: "playful", name: "Playful", icon: <Palette size={16} /> },
    { id: "dark", name: "Dark", icon: <Settings size={16} /> },
];

export default function SiteBuilder() {
    const [site, setSite] = useState<Website>({
        id: "draft",
        subdomain: "",
        templateId: "modern",
        brand: {
            siteName: "VARUN",
            primaryColor: "#6366f1",
            secondaryColor: "#0f172a",
            logoUrl: ""
        },
        sections: {
            hero: {
                headline: "The Future of Digital Infrastructure",
                subheadline: "Scale your business with zero-latency edge cloud and intelligent automation.",
                ctaText: "Get Started Now"
            },
            about: {
                title: "Who We Are",
                text: "We are a distributed team of engineering architects building the backbone of the decentralized web. Our focus is on performance, security, and developer joy."
            },
            services: [
                { id: "s1", title: "Edge Cloud", description: "Deploy globally in milliseconds.", icon: "Zap" },
                { id: "s2", title: "Smart DNS", description: "Route traffic with precision.", icon: "Navigation" }
            ],
            features: [
                { id: "f1", title: "Zero Latency", description: "Under 20ms global responses.", icon: "MousePointer" },
                { id: "f2", title: "Full Encryption", description: "End-to-end security by default.", icon: "CheckCircle2" }
            ],
            gallery: {
                title: "Showcase",
                items: [
                    { id: "g1", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", caption: "Data Center Infrastructure" },
                    { id: "g2", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", caption: "Global Network Coverage" },
                    { id: "g3", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", caption: "Advanced Automation" },
                    { id: "g4", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", caption: "Security First Approach" }
                ]
            },
            contact: {
                phone: "+1 (555) 000-0000",
                email: "hello@nexgen.io",
                whatsapp: "+15550000000",
                address: "123 Tech Plaza, Silicon Valley, CA",
                googleMapsUrl: "https://maps.google.com/maps?q=Silicon%20Valley&output=embed",
                showStickyContact: true
            }
        },
        animationsEnabled: true,
        status: "DRAFT",
        createdAt: new Date().toISOString(),
        sectionOrder: ["hero", "about", "services", "features", "gallery", "contact"]
    });

    const [activeTab, setActiveTab] = useState<"design" | "content" | "publish">("design");
    const [openSection, setOpenSection] = useState<string | null>("hero");
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

    // Preview Scroll Reference
    const previewRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (sectionId: string) => {
        if (!previewRef.current) return;

        // Find the element within the preview container
        const target = previewRef.current.querySelector(`#${sectionId}`);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Auto-scroll when section is opened
    useEffect(() => {
        if (openSection && activeTab === 'content') {
            // Small delay to ensure render is complete
            const timer = setTimeout(() => scrollToSection(openSection), 100);
            return () => clearTimeout(timer);
        }
    }, [openSection, activeTab]);

    const handlePublish = async () => {
        setIsPublishing(true);
        setError(null);
        try {
            const response = await fetch("/api/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(site),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to publish");

            setPublishedUrl(data.url);
            setActiveTab("publish");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsPublishing(false);
        }
    };

    const updateBrand = (key: string, value: any) => {
        setSite(prev => ({ ...prev, brand: { ...prev.brand, [key]: value } }));
    };

    const updateSection = (sectionName: keyof Website["sections"], key: string, value: any) => {
        setSite(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [sectionName]: {
                    ...(prev.sections[sectionName] as any),
                    [key]: value
                }
            }
        }));
    };

    const updateListItem = (sectionName: "services" | "features", id: string, key: string, value: string) => {
        setSite(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [sectionName]: (prev.sections[sectionName] as any[]).map(item =>
                    item.id === id ? { ...item, [key]: value } : item
                )
            }
        }));
    };

    const addListItem = (sectionName: "services" | "features") => {
        const newId = Math.random().toString(36).substring(7);
        const newItem = sectionName === "services"
            ? { id: newId, title: "New Service", description: "Service details..." }
            : { id: newId, title: "New Feature", description: "Feature details..." };

        setSite(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [sectionName]: [...(prev.sections[sectionName] as any[]), newItem]
            }
        }));

        // Scroll to the section to show the new item
        setTimeout(() => scrollToSection(sectionName), 100);
    };

    const removeListItem = (sectionName: "services" | "features", id: string) => {
        setSite(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [sectionName]: (prev.sections[sectionName] as any[]).filter(item => item.id !== id)
            }
        }));
    };

    const simulateLogoUpload = () => {
        // Simulate an "upload" by using a nice placeholder logo
        const logos = [
            "https://cdn.worldvectorlogo.com/logos/next-js.svg",
            "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
            "https://cdn.worldvectorlogo.com/logos/supa.svg"
        ];
        const randomLogo = logos[Math.floor(Math.random() * logos.length)];
        updateBrand("logoUrl", randomLogo);
    };

    const toggleAnimation = () => {
        setSite(prev => ({ ...prev, animationsEnabled: !prev.animationsEnabled }));
    };

    const reorderSections = (newOrder: string[]) => {
        setSite(prev => ({ ...prev, sectionOrder: newOrder }));
    };

    const removeSection = (id: string) => {
        setSite(prev => ({ ...prev, sectionOrder: prev.sectionOrder.filter(s => s !== id) }));
        if (openSection === id) setOpenSection(null);
    };

    const addSection = (id: string) => {
        setSite(prev => ({ ...prev, sectionOrder: [...prev.sectionOrder, id] }));
        setOpenSection(id);
    };

    const addGalleryItem = () => {
        const newId = Math.random().toString(36).substring(7);
        const newItem = {
            id: newId,
            url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            caption: "New Image Caption"
        };
        setSite(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                gallery: {
                    ...prev.sections.gallery,
                    items: [...prev.sections.gallery.items, newItem]
                }
            }
        }));
    };

    const updateGalleryItem = (id: string, key: string, value: string) => {
        setSite(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                gallery: {
                    ...prev.sections.gallery,
                    items: prev.sections.gallery.items.map(item =>
                        item.id === id ? { ...item, [key]: value } : item
                    )
                }
            }
        }));
    };

    const removeGalleryItem = (id: string) => {
        setSite(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                gallery: {
                    ...prev.sections.gallery,
                    items: prev.sections.gallery.items.filter(item => item.id !== id)
                }
            }
        }));
    };

    const ALL_SECTION_NAMES: Record<string, string> = {
        hero: "Hero Section",
        about: "About Section",
        services: "Services",
        features: "Features",
        gallery: "Image Gallery",
        contact: "Contact Info"
    };

    const SectionHeader = ({ id, title, icon, dragControls }: { id: string, title: string, icon: any, dragControls: any }) => (
        <div
            style={{
                padding: "1rem",
                backgroundColor: openSection === id ? "#f8f9fa" : "transparent",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "background 0.2s"
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flex: 1 }}>
                <div
                    onPointerDown={(e) => dragControls.start(e)}
                    style={{ cursor: "grab", padding: "0.5rem", display: "flex", alignItems: "center", color: "#ccc" }}
                >
                    <GripVertical size={16} />
                </div>

                <div
                    onClick={() => setOpenSection(openSection === id ? null : id)}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", flex: 1, padding: "0.5rem 0" }}
                >
                    <span style={{ color: site.brand.primaryColor }}>{icon}</span>
                    {title}
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                    onClick={(e) => { e.stopPropagation(); removeSection(id); }}
                    style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", color: "#ff4d4d", padding: "0.5rem", display: "flex", alignItems: "center", opacity: 0.6 }}
                    title="Remove Section"
                >
                    <Trash2 size={14} />
                </button>
                <div
                    onClick={() => setOpenSection(openSection === id ? null : id)}
                    style={{ cursor: "pointer", padding: "0.5rem", display: "flex", alignItems: "center" }}
                >
                    {openSection === id ? <ChevronUp size={16} color="#888" /> : <ChevronDown size={16} color="#888" />}
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ display: "flex", height: "100vh", backgroundColor: "#fff", color: "#000", overflow: "hidden", fontFamily: "var(--font-sans)" }}>
            {/* Sidebar Control Panel */}
            <div style={{ width: "400px", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", backgroundColor: "#fff", zIndex: 10 }}>
                {/* Panel Header */}
                <div style={{ padding: "1.5rem", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#000",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4.5L12 21L20 4.5" />
                        </svg>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: "1.2rem", letterSpacing: "-0.5px" }}>VA<span style={{ color: "#f901d8" }}>RUN</span></div>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: "flex", padding: "0.5rem", gap: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    {['design', 'content', 'publish'].map(t => (
                        <button
                            key={t}
                            onClick={() => setActiveTab(t as any)}
                            style={{
                                flex: 1,
                                padding: "0.6rem",
                                borderRadius: "6px",
                                border: "none",
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                cursor: "pointer",
                                backgroundColor: activeTab === t ? "#f4f4f5" : "transparent",
                                color: activeTab === t ? "#000" : "#666",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em"
                            }}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Scrollable controls */}
                <div style={{ flex: 1, overflowY: "auto", paddingBottom: "2rem" }}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'design' && (
                            <motion.div key="design" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
                                {/* Template Select */}
                                <div>
                                    <label style={{ fontSize: "0.7rem", fontWeight: 800, color: "#aaa", marginBottom: "1rem", display: "block" }}>TEMPLATE</label>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                                        {TEMPLATES.map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => setSite(prev => ({ ...prev, templateId: t.id }))}
                                                style={{
                                                    padding: "0.75rem",
                                                    borderRadius: "10px",
                                                    border: site.templateId === t.id ? `2px solid ${site.brand.primaryColor}` : "1px solid #f0f0f0",
                                                    backgroundColor: "#fff",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                    fontWeight: 700,
                                                    fontSize: "0.8rem",
                                                    textAlign: "left"
                                                }}
                                            >
                                                {t.icon} {t.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Brand Identity */}
                                <div>
                                    <label style={{ fontSize: "0.7rem", fontWeight: 800, color: "#aaa", marginBottom: "1rem", display: "block" }}>BRAND IDENTITY</label>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                        <input
                                            type="text"
                                            placeholder="Website Name"
                                            value={site.brand.siteName}
                                            onChange={e => updateBrand("siteName", e.target.value)}
                                            style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #f0f0f0", fontSize: "0.9rem", fontWeight: 600 }}
                                        />
                                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                            {site.brand.logoUrl ? (
                                                <div style={{ position: "relative" }}>
                                                    <img src={site.brand.logoUrl} alt="Logo" style={{ height: "40px", width: "40px", objectFit: "contain", borderRadius: "4px", border: "1px solid #f0f0f0" }} />
                                                    <button onClick={() => updateBrand("logoUrl", "")} style={{ position: "absolute", top: -8, right: -8, backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Trash2 size={10} /></button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={simulateLogoUpload}
                                                    style={{
                                                        height: "40px",
                                                        flex: 1,
                                                        border: "2px dashed #eee",
                                                        borderRadius: "8px",
                                                        backgroundColor: "#fafafa",
                                                        color: "#888",
                                                        fontSize: "0.75rem",
                                                        fontWeight: 600,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        gap: "0.5rem",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <Upload size={14} /> Upload Logo
                                                </button>
                                            )}
                                            <div style={{ flex: 1, fontSize: "0.7rem", color: "#888" }}>Max 2MB. SVG, PNG.</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Colors */}
                                <div>
                                    <label style={{ fontSize: "0.7rem", fontWeight: 800, color: "#aaa", marginBottom: "1rem", display: "block" }}>COLORS</label>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        <div>
                                            <div style={{ fontSize: "0.7rem", fontWeight: 700, marginBottom: "0.5rem" }}>Primary</div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                                                <input type="color" value={site.brand.primaryColor} onChange={e => updateBrand("primaryColor", e.target.value)} style={{ width: "30px", height: "30px", border: "none", borderRadius: "4px", cursor: "pointer" }} />
                                                <span style={{ fontSize: "0.75rem", fontFamily: "monospace", textTransform: "uppercase" }}>{site.brand.primaryColor}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.7rem", fontWeight: 700, marginBottom: "0.5rem" }}>Secondary</div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                                                <input type="color" value={site.brand.secondaryColor} onChange={e => updateBrand("secondaryColor", e.target.value)} style={{ width: "30px", height: "30px", border: "none", borderRadius: "4px", cursor: "pointer" }} />
                                                <span style={{ fontSize: "0.75rem", fontFamily: "monospace", textTransform: "uppercase" }}>{site.brand.secondaryColor}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Settings */}
                                <div>
                                    <label style={{ fontSize: "0.7rem", fontWeight: 800, color: "#aaa", marginBottom: "1rem", display: "block" }}>PREFERENCES</label>
                                    <div
                                        onClick={toggleAnimation}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "0.75rem",
                                            backgroundColor: "#f8f9fa",
                                            borderRadius: "10px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                            <MousePointer2 size={16} color={site.brand.primaryColor} />
                                            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Enable Animations</span>
                                        </div>
                                        <div style={{
                                            width: "40px",
                                            height: "22px",
                                            backgroundColor: site.animationsEnabled ? site.brand.primaryColor : "#ddd",
                                            borderRadius: "99px",
                                            position: "relative",
                                            transition: "background 0.2s"
                                        }}>
                                            <div style={{
                                                position: "absolute",
                                                top: "2px",
                                                left: site.animationsEnabled ? "20px" : "2px",
                                                width: "18px",
                                                height: "18px",
                                                backgroundColor: "#fff",
                                                borderRadius: "50%",
                                                transition: "left 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                                            }}></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'content' && (
                            <motion.div key="content" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} style={{ display: "flex", flexDirection: "column" }}>

                                <Reorder.Group axis="y" values={site.sectionOrder} onReorder={reorderSections} style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {site.sectionOrder.map((sectionId) => (
                                        <ReorderItem
                                            key={sectionId}
                                            sectionId={sectionId}
                                            site={site}
                                            openSection={openSection}
                                            setOpenSection={setOpenSection}
                                            updateSection={updateSection}
                                            updateListItem={updateListItem}
                                            removeListItem={removeListItem}
                                            addListItem={addListItem}
                                            removeSection={removeSection}
                                            SectionHeader={SectionHeader}
                                            addGalleryItem={addGalleryItem}
                                            updateGalleryItem={updateGalleryItem}
                                            removeGalleryItem={removeGalleryItem}
                                        />
                                    ))}
                                </Reorder.Group>

                                {/* Hidden Sections */}
                                {Object.keys(ALL_SECTION_NAMES).filter(id => !site.sectionOrder.includes(id)).length > 0 && (
                                    <div style={{ padding: "1.5rem", borderTop: "1px solid #f0f0f0" }}>
                                        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#aaa", marginBottom: "1rem" }}>HIDDEN SECTIONS</div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                            {Object.keys(ALL_SECTION_NAMES).filter(id => !site.sectionOrder.includes(id)).map(id => (
                                                <button
                                                    key={id}
                                                    onClick={() => addSection(id)}
                                                    style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", border: "1px solid #eee", backgroundColor: "#fff", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
                                                >
                                                    <Plus size={12} /> {ALL_SECTION_NAMES[id]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'publish' && (
                            <motion.div key="publish" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
                                <div>
                                    <label style={{ fontSize: "0.7rem", fontWeight: 800, color: "#aaa", marginBottom: "1rem", display: "block" }}>SUBDOMAIN</label>
                                    <div style={{ display: "flex", border: "1px solid #f0f0f0", borderRadius: "8px", overflow: "hidden" }}>
                                        <input placeholder="brand-name" value={site.subdomain} onChange={e => setSite(prev => ({ ...prev, subdomain: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} style={{ flex: 1, padding: "0.75rem", border: "none", outline: "none" }} />
                                        <div style={{ padding: "0.75rem", backgroundColor: "#f8f9fa", fontSize: "0.8rem", color: "#888", fontWeight: 600 }}>.lvh.me</div>
                                    </div>
                                    <p style={{ fontSize: "0.7rem", color: "#aaa", marginTop: "0.5rem" }}>Use only lowercase letters, numbers, and hyphens.</p>
                                </div>

                                {publishedUrl ? (
                                    <div style={{ padding: "2rem", backgroundColor: "#f0fdf4", borderRadius: "20px", border: "1px solid #22c55e", textAlign: "center" }}>
                                        <div style={{ width: "48px", height: "48px", backgroundColor: "#22c55e", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <h3 style={{ fontWeight: 900, marginBottom: "0.5rem" }}>Success! Your site is live.</h3>
                                        <p style={{ fontSize: "0.8rem", color: "#166534", marginBottom: "1.5rem" }}>Anyone with this link can now view your website.</p>
                                        <a href={publishedUrl} target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.75rem", backgroundColor: "#fff", border: "1px solid #22c55e", borderRadius: "10px", color: "#166534", fontWeight: 800, fontSize: "0.85rem" }}>
                                            Visit Website <ExternalLink size={14} />
                                        </a>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handlePublish}
                                        disabled={isPublishing || !site.subdomain}
                                        style={{
                                            width: "100%",
                                            padding: "1rem",
                                            backgroundColor: isPublishing || !site.subdomain ? "#f4f4f5" : site.brand.primaryColor,
                                            color: "#fff",
                                            borderRadius: "12px",
                                            border: "none",
                                            fontWeight: 800,
                                            cursor: isPublishing || !site.subdomain ? "not-allowed" : "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "0.75rem",
                                            boxShadow: !isPublishing && site.subdomain ? `0 10px 20px -5px ${site.brand.primaryColor}44` : "none"
                                        }}
                                    >
                                        {isPublishing ? <Loader2 size={18} className="animate-spin" /> : <>Deploy infrastructure <ChevronRight size={18} /></>}
                                    </button>
                                )}
                                {error && <div style={{ color: "#ef4444", fontSize: "0.8rem", display: "flex", gap: "0.5rem", padding: "1rem", backgroundColor: "#fff5f5", borderRadius: "8px" }}><AlertCircle size={14} /> {error}</div>}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Preview Area */}
            <div style={{ flex: 1, backgroundColor: "#f8f9fa", display: "flex", flexDirection: "column" }}>
                {/* Device Preview Bar */}
                <div style={{ height: "60px", backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                    <div style={{ display: "flex", backgroundColor: "#f4f4f5", padding: "0.25rem", borderRadius: "8px" }}>
                        <button
                            onClick={() => setViewMode("desktop")}
                            style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", border: "none", backgroundColor: viewMode === "desktop" ? "#fff" : "transparent", cursor: "pointer", boxShadow: viewMode === "desktop" ? "0 2px 4px rgba(0,0,0,0.05)" : "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
                        >
                            <Monitor size={14} /> <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>DESKTOP</span>
                        </button>
                        <button
                            onClick={() => setViewMode("mobile")}
                            style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", border: "none", backgroundColor: viewMode === "mobile" ? "#fff" : "transparent", cursor: "pointer", boxShadow: viewMode === "mobile" ? "0 2px 4px rgba(0,0,0,0.05)" : "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
                        >
                            <Smartphone size={14} /> <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>MOBILE</span>
                        </button>
                    </div>
                </div>

                {/* Canvas Area */}
                <div style={{ flex: 1, padding: "3rem", display: "flex", justifyContent: "center", overflow: "hidden" }}>
                    <motion.div
                        ref={previewRef}
                        animate={{ width: viewMode === "desktop" ? "100%" : "375px" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                            height: "100%",
                            backgroundColor: "#fff",
                            borderRadius: viewMode === "mobile" ? "40px" : "12px",
                            border: viewMode === "mobile" ? "12px solid #000" : "1px solid #f0f0f0",
                            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.1)",
                            overflow: "auto",
                            position: "relative",
                            transform: "translateZ(0)",
                            willChange: "transform",
                            perspective: "1000px",
                            backfaceVisibility: "hidden",
                            isolation: "isolate"
                        }}
                    >
                        <TemplateRenderer
                            site={site}
                            isMobile={viewMode === "mobile"}
                        />
                    </motion.div>
                </div>
            </div>
            <style jsx global>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style>
        </div>
    );
}
