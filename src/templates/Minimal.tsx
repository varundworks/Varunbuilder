"use client";

import { motion } from "framer-motion";
import {
    Phone, Mail, MessageCircle, MapPin, Briefcase, Zap, Users, Star,
    Shield, Heart, Smile, Camera, Globe, Layout, Smartphone, Check,
    CheckCircle2, MousePointer, MousePointer2, Info, ArrowRight
} from "lucide-react";
import { Website } from "@/lib/types";
import { getCtaHref, getGoogleMapsEmbedUrl } from "@/lib/leadActions";

const IconMap: Record<string, any> = {
    Zap, Briefcase, Users, Phone, Mail, MessageCircle, MapPin,
    Star, Shield, Heart, Smile, Camera, Globe, Layout, Smartphone,
    Check, CheckCircle2, MousePointer, MousePointer2, Info, ArrowRight
};

const RenderIcon = ({ name, color, size }: { name?: string, color: string, size: number }) => {
    const Icon = name ? IconMap[name] : null;
    if (!Icon) return null;
    return <Icon color={color} size={size} />;
};

interface TemplateProps {
    site: Website;
    isMobile?: boolean;
}

export default function MinimalTemplate({ site, isMobile = false }: TemplateProps) {
    const { brand, sections, sectionOrder = ["hero", "about", "services", "contact"], animationsEnabled } = site;
    const { hero, about, services, gallery, contact } = sections;

    const motionProps = animationsEnabled ? {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 1 }
    } : {};

    const renderSection = (id: string) => {
        switch (id) {
            case "hero":
                return (
                    <section key="hero" id="hero" style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 10% 4rem" }}>
                        <motion.h1
                            {...motionProps}
                            style={{
                                fontSize: isMobile ? "3rem" : "clamp(3.5rem, 12vw, 9rem)",
                                fontWeight: 300,
                                letterSpacing: "-0.05em",
                                lineHeight: 0.9,
                                marginBottom: isMobile ? "3rem" : "6rem"
                            }}
                        >
                            {hero.headline.split(' ').map((word, i) => (
                                <span key={i} style={i % 2 === 1 ? { fontStyle: "italic", fontWeight: 200 } : {}}>{word} </span>
                            ))}
                        </motion.h1>
                    </section>
                );
            case "about":
                return (
                    <section key="about" id="about" style={{ padding: isMobile ? "2rem 1.5rem 6rem" : "0 10% 10rem", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "3rem" : "10%" }}>
                        <div style={{ flex: 1, alignSelf: isMobile ? "flex-start" : "end" }}>
                            <p style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", lineHeight: 1.4, color: "#111", marginBottom: "2rem" }}>
                                {hero.subheadline}
                            </p>
                            <a
                                href={getCtaHref(hero, contact)}
                                style={{
                                    padding: isMobile ? "0.8rem 2rem" : "1rem 3rem",
                                    backgroundColor: "#111",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "0",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.05em",
                                    textDecoration: "none",
                                    display: "inline-block"
                                }}
                            >
                                {hero.ctaText.toUpperCase()}
                            </a>
                        </div>
                        <div style={{ flex: 1, borderLeft: isMobile ? "none" : "1px solid #eee", borderTop: isMobile ? "1px solid #eee" : "none", paddingLeft: isMobile ? 0 : "2rem", paddingTop: isMobile ? "2rem" : 0 }}>
                            <h2 style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "1.5rem", color: "#888" }}>ABOUT</h2>
                            <p style={{ lineHeight: 1.7, color: "#666", fontSize: isMobile ? "0.9rem" : "1rem" }}>{about.text}</p>
                        </div>
                    </section>
                );
            case "services":
                return (
                    <section key="services" id="services" style={{ padding: isMobile ? "6rem 1.5rem" : "10rem 10%", backgroundColor: "#fff" }}>
                        <div style={{ maxWidth: "800px" }}>
                            <h2 style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "3rem", color: "#888" }}>SERVICES</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "2.5rem" : "4rem" }}>
                                {services.map((service, i) => (
                                    <motion.div key={service.id} {...motionProps} style={{ display: "flex", borderBottom: "1px solid #f0f0f0", paddingBottom: "1.5rem" }}>
                                        <div style={{ width: isMobile ? "40px" : "100px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: brand.primaryColor }}>0{i + 1}</div>
                                            <RenderIcon name={service.icon} color={brand.primaryColor} size={16} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 400, marginBottom: "0.5rem" }}>{service.title}</h3>
                                            <p style={{ color: "#666", fontSize: "0.85rem" }}>{service.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case "contact":
                const mapUrl = getGoogleMapsEmbedUrl(contact.googleMapsUrl);
                return (
                    <section key="contact" id="contact" style={{ padding: isMobile ? "6rem 1.5rem" : "10rem 10%" }}>
                        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "start", gap: "4rem" }}>
                            <div>
                                <h2 style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "3rem", color: "#888" }}>CONTACT</h2>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <a href={`mailto:${contact.email}`} style={{ fontSize: isMobile ? "1.5rem" : "2.5rem", fontWeight: 300, color: "inherit", textDecoration: "none" }}>{contact.email}</a>
                                    <a href={`tel:${contact.phone}`} style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", color: "#888", textDecoration: "none" }}>{contact.phone}</a>
                                    {contact.whatsapp && (
                                        <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} style={{ fontSize: "1rem", color: brand.primaryColor, fontWeight: 700, textDecoration: "none" }}>WHATSAPP</a>
                                    )}
                                </div>
                            </div>

                            {(contact.address || mapUrl) && (
                                <div style={{ flex: 1, width: "100%" }}>
                                    {contact.address && (
                                        <div style={{ marginBottom: "2rem" }}>
                                            <h3 style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "1rem", color: "#888" }}>ADDRESS</h3>
                                            <p style={{ fontSize: "1rem", color: "#666", maxWidth: "300px" }}>{contact.address}</p>
                                        </div>
                                    )}
                                    {mapUrl && (
                                        <div style={{ filter: "grayscale(1) contrast(1.2) opacity(0.8)", height: "300px", border: "1px solid #eee" }}>
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
                            )}
                        </div>
                    </section>
                );
            case "gallery":
                return (
                    <section key="gallery" id="gallery" style={{ padding: isMobile ? "6rem 1.5rem" : "10rem 10%", backgroundColor: "#fff" }}>
                        <h2 style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "4rem", color: "#888" }}>GALLERY</h2>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                            gap: "0.5rem"
                        }}>
                            {gallery?.items?.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    {...motionProps}
                                    transition={{ delay: i * 0.1 }}
                                    style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", backgroundColor: "#f9f9f9" }}
                                >
                                    <img src={item.url} alt={item.caption} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.1)", transition: "0.6s" }} />
                                    {item.caption && (
                                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", backgroundColor: "rgba(255,255,255,0.9)", transform: "translateY(100%)", transition: "0.3s" }}>
                                            <p style={{ margin: 0, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}>{item.caption.toUpperCase()}</p>
                                        </div>
                                    )}
                                    <style>{`
                                        #gallery div:hover img { filter: grayscale(0) contrast(1); }
                                        #gallery div:hover div { transform: translateY(0); }
                                    `}</style>
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
        <div style={{ backgroundColor: "#faf9f6", color: "#111", minHeight: "100vh", fontFamily: "'Inter', sans-serif", width: "100%", position: "relative" }}>
            {/* Tiny Header */}
            <nav style={{ padding: isMobile ? "2rem 1.5rem" : "3rem 10%", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: isMobile ? "0.9rem" : "1.1rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                    {brand.logoUrl ? <img src={brand.logoUrl} height={isMobile ? "20" : "24"} /> : brand.siteName.toUpperCase()}
                </div>
            </nav>

            {/* Sticky Mobile Button */}
            {isMobile && contact.showStickyContact && (
                <div style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 1000, display: "flex", gap: "0.5rem" }}>
                    {contact.whatsapp && (
                        <a
                            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                            style={{ width: "32px", height: "32px", backgroundColor: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
                            title="Chat on WhatsApp"
                        >
                            <MessageCircle size={16} fill="currentColor" />
                        </a>
                    )}
                    <a
                        href={`tel:${contact.phone}`}
                        style={{ width: "32px", height: "32px", backgroundColor: brand.primaryColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
                        title="Call Now"
                    >
                        <Phone size={16} fill="currentColor" />
                    </a>
                </div>
            )}

            {/* Dynamic Body Sections */}
            {sectionOrder.map(renderSection)}

            {/* Minimal Footer */}
            <footer style={{ padding: "4rem 0", textAlign: "center", fontSize: "0.6rem", fontWeight: 500, color: "#aaa", letterSpacing: "0.1em" }}>
                © {new Date().getFullYear()} {brand.siteName.toUpperCase()}
            </footer>
        </div>
    );
}
