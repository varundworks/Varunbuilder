"use client";

import { motion } from "framer-motion";
import {
    ArrowUpRight, BarChart3, Target, Phone, Mail, Menu, MessageCircle, MapPin,
    Briefcase, Zap, Users, Star, Shield, Heart, Smile, Camera, Globe,
    Layout, Smartphone, Check, CheckCircle2, MousePointer, MousePointer2, Info, Image as ImageIcon
} from "lucide-react";
import { Website } from "@/lib/types";
import { getCtaHref, getGoogleMapsEmbedUrl } from "@/lib/leadActions";

const IconMap: Record<string, any> = {
    Zap, Briefcase, Users, Phone, Mail, Menu, MessageCircle, MapPin, ArrowUpRight,
    Star, Shield, Heart, Smile, Camera, Globe, Layout, Smartphone, Check, CheckCircle2,
    MousePointer, MousePointer2, Info, Target
};

const RenderIcon = ({ name, color, size }: { name?: string, color: string, size: number }) => {
    const Icon = name ? IconMap[name] : null;
    if (!Icon) return <Target color={color} size={size} />;
    return <Icon color={color} size={size} />;
};

interface TemplateProps {
    site: Website;
    isMobile?: boolean;
}

export default function ProfessionalTemplate({ site, isMobile = false }: TemplateProps) {
    const { brand, sections, sectionOrder = ["hero", "about", "services", "contact"], animationsEnabled } = site;
    const { hero, about, services, features, gallery, contact } = sections;

    const motionProps = animationsEnabled ? {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    } : {};

    const renderSection = (id: string) => {
        switch (id) {
            case "hero":
                return (
                    <section key="hero" id="hero" style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        minHeight: isMobile ? "auto" : "80vh",
                        padding: isMobile ? "4rem 1.5rem" : "0 8%",
                        alignItems: "center",
                        gap: isMobile ? "3rem" : "5rem"
                    }}>
                        <div style={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
                            <motion.div {...motionProps}>
                                <h1 style={{ fontSize: isMobile ? "2.5rem" : "clamp(3rem, 6vw, 4rem)", lineHeight: 1.1, marginBottom: "2rem", fontWeight: 800 }}>
                                    {hero.headline}
                                </h1>
                                <p style={{ fontSize: isMobile ? "1.1rem" : "1.2rem", color: "#666", lineHeight: 1.7, marginBottom: "2rem", maxWidth: isMobile ? "100%" : "500px" }}>
                                    {hero.subheadline}
                                </p>
                                <div style={{ display: "flex", gap: "1.5rem", justifyContent: isMobile ? "center" : "flex-start" }}>
                                    <a
                                        href={getCtaHref(hero, contact)}
                                        style={{
                                            padding: "1rem 2.5rem",
                                            backgroundColor: brand.primaryColor,
                                            color: "#fff",
                                            textDecoration: "none",
                                            borderRadius: "4px",
                                            fontWeight: 600,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem"
                                        }}
                                    >
                                        {hero.ctaText} <ArrowUpRight size={18} />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                        {!isMobile && (
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    width: "100%",
                                    aspectRatio: "1.2/1",
                                    backgroundColor: "#f5f5f7",
                                    borderRadius: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #eee"
                                }}>
                                    <BarChart3 size={150} color={brand.primaryColor} strokeWidth={1} style={{ opacity: 0.2 }} />
                                </div>
                            </div>
                        )}
                    </section>
                );
            case "about":
                return (
                    <section key="about" id="about" style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 8%", backgroundColor: "#0f172a", color: "#fff" }}>
                        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "3rem" : "5rem" }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: isMobile ? "1.8rem" : "2rem", marginBottom: "2rem", color: brand.primaryColor }}>{about.title}</h2>
                                <p style={{ fontSize: isMobile ? "1.1rem" : "1.2rem", color: "#94a3b8", lineHeight: 1.8 }}>{about.text}</p>
                            </div>
                            <div id="features" style={{ flex: 1, borderLeft: isMobile ? "none" : "4px solid #1e293b", borderTop: isMobile ? "4px solid #1e293b" : "none", paddingLeft: isMobile ? 0 : "3rem", paddingTop: isMobile ? "2rem" : 0 }}>
                                <h3 style={{ fontSize: "0.9rem", color: brand.primaryColor, marginBottom: "2rem", letterSpacing: "0.1em" }}>OUR COMMITMENT</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "1.5rem" : "2rem" }}>
                                    {features.map(f => (
                                        <div key={f.id} style={{ display: "flex", gap: "1rem" }}>
                                            <div style={{ padding: "0.25rem" }}>
                                                <RenderIcon name={f.icon} color={brand.primaryColor} size={18} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: isMobile ? "0.95rem" : "1rem" }}>{f.title}</div>
                                                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>{f.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                );
            case "services":
                return (
                    <section key="services" id="services" style={{ padding: isMobile ? "4rem 1.5rem" : "10rem 8%" }}>
                        <h2 style={{ fontSize: isMobile ? "2rem" : "2.5rem", marginBottom: isMobile ? "3rem" : "6rem", textAlign: "center" }}>Strategic Advisory</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: isMobile ? "2rem" : "4rem" }}>
                            {services.map((service, i) => (
                                <motion.div key={service.id} {...motionProps} transition={{ delay: i * 0.1 }} style={{ textAlign: "left", padding: "1rem" }}>
                                    <div style={{ color: brand.primaryColor, marginBottom: "1.5rem" }}>
                                        <RenderIcon name={service.icon} color={brand.primaryColor} size={30} />
                                    </div>
                                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>{service.title}</h3>
                                    <p style={{ color: "#666", lineHeight: 1.6, fontSize: "0.9rem" }}>{service.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                );
            case "contact":
                const mapUrl = getGoogleMapsEmbedUrl(contact.googleMapsUrl);
                return (
                    <section key="contact" id="contact" style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 8%", backgroundColor: "#f8f9fa" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "5rem", alignItems: "center" }}>
                            <div>
                                <h2 style={{ fontSize: isMobile ? "2.2rem" : "3rem", marginBottom: "2rem" }}>Let's talk business.</h2>
                                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                                            <Phone size={20} color={brand.primaryColor} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#888" }}>DIAL</div>
                                            <a href={`tel:${contact.phone}`} style={{ fontSize: "1.1rem", fontWeight: 700, color: "inherit", textDecoration: "none" }}>{contact.phone}</a>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                                            <Mail size={20} color={brand.primaryColor} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#888" }}>EMAIL</div>
                                            <a href={`mailto:${contact.email}`} style={{ fontSize: "1.1rem", fontWeight: 700, color: "inherit", textDecoration: "none" }}>{contact.email}</a>
                                        </div>
                                    </div>
                                    {contact.address && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                                                <MapPin size={20} color={brand.primaryColor} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#888" }}>OFFICE</div>
                                                <div style={{ fontSize: "1rem", color: "#444" }}>{contact.address}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {mapUrl && (
                                <div style={{ borderRadius: "12px", overflow: "hidden", height: "450px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
                                    <iframe
                                        src={mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </section>
                );
            case "features":
                return (
                    <section key="features" id="features" style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 8%", backgroundColor: "#fff" }}>
                        <h2 style={{ fontSize: isMobile ? "2rem" : "2.5rem", marginBottom: isMobile ? "3rem" : "4rem", textAlign: "center" }}>Core Features</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                            {features.map((feature, i) => (
                                <motion.div key={feature.id} {...motionProps} transition={{ delay: i * 0.1 }} style={{ padding: "2rem", border: "1px solid #eee", borderRadius: "8px" }}>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>{feature.title}</h3>
                                    <p style={{ color: "#666", fontSize: "0.9rem" }}>{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                );
            case "gallery":
                return (
                    <section key="gallery" id="gallery" style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 8%", backgroundColor: "#f8f9fa" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem" }}>
                            <div>
                                <h3 style={{ fontSize: "0.9rem", color: brand.primaryColor, marginBottom: "1rem", letterSpacing: "0.1em" }}>PROJECTS</h3>
                                <h2 style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800 }}>{gallery?.title || "Portfolio"}</h2>
                            </div>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(350px, 1fr))",
                            gap: "2rem"
                        }}>
                            {gallery?.items?.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    {...motionProps}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        backgroundColor: "#fff",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                                        border: "1px solid #eee"
                                    }}
                                >
                                    <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                                        <img src={item.url} alt={item.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    {item.caption && (
                                        <div style={{ padding: "1.5rem" }}>
                                            <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>{item.caption}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ backgroundColor: "#fff", color: "#1a1a1a", minHeight: "100vh", fontFamily: "'Inter', sans-serif", width: "100%", position: "relative" }}>
            {/* Sticky Mobile Button */}
            {isMobile && contact.showStickyContact && (
                <div style={{ position: "fixed", bottom: "1rem", left: "1rem", right: "1rem", zIndex: 1000, display: "flex", gap: "0.75rem" }}>
                    {contact.whatsapp && (
                        <a
                            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                            style={{ flex: 1, height: "38px", borderRadius: "4px", backgroundColor: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 12px rgba(37, 211, 102, 0.2)", fontSize: "0.8rem" }}
                            title="Chat on WhatsApp"
                        >
                            <MessageCircle size={16} fill="currentColor" /> WhatsApp
                        </a>
                    )}
                    <a
                        href={`tel:${contact.phone}`}
                        style={{ flex: 1, height: "38px", borderRadius: "4px", backgroundColor: brand.primaryColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: "0.8rem" }}
                        title="Call Now"
                    >
                        <Phone size={16} fill="currentColor" /> Call Now
                    </a>
                </div>
            )}

            {/* Navigation */}
            <nav style={{
                padding: isMobile ? "1rem 1.5rem" : "1.5rem 8%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #f0f0f0",
                backgroundColor: "#fff",
                position: "sticky",
                top: 0,
                zIndex: 100
            }}>
                <div style={{ fontSize: isMobile ? "1.2rem" : "1.4rem", fontWeight: 700, letterSpacing: "-0.5px" }}>
                    {brand.logoUrl ? <img src={brand.logoUrl} height={isMobile ? "24" : "30"} /> : brand.siteName}
                </div>
            </nav>

            {/* Dynamic Body Sections */}
            {sectionOrder.map(renderSection)}

            {/* Footer */}
            <footer style={{ padding: "3rem 1.5rem", borderTop: "1px solid #eee", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", color: "#888", fontSize: "0.8rem", gap: "1rem", textAlign: isMobile ? "center" : "left" }}>
                <div>© {new Date().getFullYear()} {brand.siteName}. Strategic Partners.</div>
                <div style={{ display: "flex", gap: "2rem", justifyContent: isMobile ? "center" : "flex-end" }}>
                    <span>PRIVACY</span>
                    <span>TERMS</span>
                </div>
            </footer>
        </div>
    );
}
