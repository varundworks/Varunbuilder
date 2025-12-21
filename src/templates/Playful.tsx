"use client";

import { motion } from "framer-motion";
import {
    Sparkles, Heart, Music, Phone, Mail, Menu, MessageCircle, MapPin,
    Briefcase, Zap, Users, Star, Shield, Smile, Camera, Globe,
    Layout, Smartphone, Check, CheckCircle2, MousePointer, MousePointer2, Info, ArrowRight,
    Image as ImageIcon
} from "lucide-react";
import { Website } from "@/lib/types";
import { getCtaHref, getGoogleMapsEmbedUrl } from "@/lib/leadActions";

const IconMap: Record<string, any> = {
    Zap, Briefcase, Users, Phone, Mail, Menu, MessageCircle, MapPin, ArrowRight,
    Star, Shield, Heart, Smile, Camera, Globe, Layout, Smartphone, Check, CheckCircle2,
    MousePointer, MousePointer2, Info, Sparkles, Music
};

const RenderIcon = ({ name, color, size }: { name?: string, color: string, size: number }) => {
    const Icon = name ? IconMap[name] : null;
    if (!Icon) return <Sparkles color={color} size={size} />;
    return <Icon color={color} size={size} />;
};

interface TemplateProps {
    site: Website;
    isMobile?: boolean;
}

export default function PlayfulTemplate({ site, isMobile = false }: TemplateProps) {
    const { brand, sections, sectionOrder = ["hero", "about", "services", "contact"], animationsEnabled } = site;
    const { hero, about, services, features, gallery, contact } = sections;
    const color = brand.primaryColor;
    const lightColor = `${color}15`;

    const motionProps = animationsEnabled ? {
        initial: { rotate: -2, y: 20, opacity: 0 },
        whileInView: { rotate: 0, y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    } : {};

    const renderSection = (id: string) => {
        switch (id) {
            case "hero":
                return (
                    <section key="hero" id="hero" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem" : "6rem 5%", textAlign: "center" }}>
                        <motion.div {...motionProps}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#fff", padding: "0.4rem 1rem", borderRadius: "99px", border: "2px solid #000", marginBottom: "1.5rem", fontWeight: 700, fontSize: "0.7rem" }}>
                                <Heart size={14} color="#ff7675" fill="#ff7675" /> MAGIC IS REAL.
                            </div>
                            <h1 style={{ fontSize: isMobile ? "3rem" : "clamp(3.5rem, 10vw, 6rem)", fontWeight: 900, lineHeight: 1, marginBottom: "1.5rem", textShadow: isMobile ? "4px 4px 0 rgba(0,0,0,0.05)" : "6px 6px 0 rgba(0,0,0,0.05)" }}>
                                {hero.headline}
                            </h1>
                            <p style={{ fontSize: isMobile ? "1.1rem" : "1.4rem", maxWidth: "600px", marginInline: "auto", marginBottom: "2.5rem", fontWeight: 600 }}>
                                {hero.subheadline}
                            </p>
                            <a
                                href={getCtaHref(hero, contact)}
                                style={{
                                    padding: isMobile ? "1rem 2.5rem" : "1.5rem 4rem",
                                    backgroundColor: color,
                                    color: "#fff",
                                    border: "4px solid #000",
                                    borderRadius: "20px",
                                    fontSize: isMobile ? "1.1rem" : "1.4rem",
                                    fontWeight: 900,
                                    boxShadow: "6px 6px 0 #000",
                                    textDecoration: "none",
                                    display: "inline-block"
                                }}
                            >
                                {hero.ctaText} ✨
                            </a>
                        </motion.div>
                    </section>
                );
            case "about":
                return (
                    <section key="about" id="about" style={{ position: "relative", zIndex: 1, padding: isMobile ? "3rem 1.5rem" : "8rem 5%", textAlign: "center" }}>
                        <div style={{ maxWidth: "800px", marginInline: "auto", padding: isMobile ? "2rem" : "4rem", backgroundColor: "#fff", border: "4px solid #000", borderRadius: isMobile ? "24px" : "40px", boxShadow: isMobile ? "8px 8px 0 #000" : "12px 12px 0 #000" }}>
                            <h2 style={{ fontSize: isMobile ? "1.8rem" : "2.5rem", fontWeight: 900, marginBottom: "1.5rem" }}>{about.title}</h2>
                            <p style={{ fontSize: isMobile ? "0.95rem" : "1.1rem", lineHeight: 1.6, fontWeight: 500 }}>{about.text}</p>
                        </div>
                    </section>
                );
            case "services":
                return (
                    <section key="services" id="services" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem" : "8rem 5%" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                            {services.map((service, i) => (
                                <motion.div key={service.id} {...motionProps} transition={{ delay: i * 0.1 }} style={{ padding: isMobile ? "2rem" : "3rem", backgroundColor: "#fff", border: "3px solid #000", borderRadius: "24px", textAlign: "center" }}>
                                    <div style={{ width: "60px", height: "60px", backgroundColor: lightColor, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: color }}>
                                        <RenderIcon name={service.icon} color={color} size={28} />
                                    </div>
                                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.75rem" }}>{service.title}</h3>
                                    <p style={{ fontWeight: 500, color: "#636e72", fontSize: "0.9rem" }}>{service.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                );
            case "features":
                return (
                    <section key="features" id="features" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem" : "8rem 5%" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                            {sections.features.map((feature, i) => (
                                <div key={feature.id} style={{ padding: "2rem", backgroundColor: "#fff", border: "2px solid #000", borderRadius: "16px", boxShadow: "4px 4px 0 #000" }}>
                                    <div style={{ marginBottom: "1rem" }}>
                                        <RenderIcon name={feature.icon} color={color} size={20} />
                                    </div>
                                    <h3 style={{ fontWeight: 900, marginBottom: "0.5rem" }}>{feature.title}</h3>
                                    <p style={{ fontSize: "0.85rem", fontWeight: 500 }}>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "contact":
                const mapUrl = getGoogleMapsEmbedUrl(contact.googleMapsUrl);
                return (
                    <section key="contact" id="contact" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem 6rem" : "8rem 5%", textAlign: "center" }}>
                        <h2 style={{ fontSize: isMobile ? "2rem" : "3rem", fontWeight: 900, marginBottom: "2.5rem" }}>Stay sparkly.</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3rem", alignItems: "center" }}>
                            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", gap: "1.5rem", fontWeight: 800 }}>
                                <a href={`mailto:${contact.email}`} style={{ border: "4px solid #000", padding: "1rem 2rem", borderRadius: "20px", backgroundColor: "#fff", fontSize: isMobile ? "1.1rem" : "1.2rem", color: "inherit", textDecoration: "none", boxShadow: "6px 6px 0 #000" }}>
                                    {contact.email}
                                </a>
                                <a href={`tel:${contact.phone}`} style={{ border: "4px solid #000", padding: "1rem 2rem", borderRadius: "20px", backgroundColor: "#fff", fontSize: isMobile ? "1.1rem" : "1.2rem", color: "inherit", textDecoration: "none", boxShadow: "6px 6px 0 #000" }}>
                                    {contact.phone}
                                </a>
                                {contact.whatsapp && (
                                    <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} style={{ border: "4px solid #25D366", padding: "1rem 2rem", borderRadius: "20px", backgroundColor: "#25D366", color: "#fff", fontSize: isMobile ? "1.1rem" : "1.2rem", textDecoration: "none", boxShadow: "6px 6px 0 #000" }}>
                                        WHATSAPP
                                    </a>
                                )}
                            </div>

                            {(contact.address || mapUrl) && (
                                <div style={{ width: "100%", maxWidth: "1000px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem", textAlign: "left" }}>
                                    {contact.address && (
                                        <div style={{ backgroundColor: "#fff", border: "4px solid #000", padding: "2rem", borderRadius: "24px", boxShadow: "8px 8px 0 #000" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                                                <MapPin size={24} color={color} />
                                                <h3 style={{ fontWeight: 900, fontSize: "1.4rem" }}>Find Us</h3>
                                            </div>
                                            <p style={{ fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.5 }}>{contact.address}</p>
                                        </div>
                                    )}
                                    {mapUrl && (
                                        <div style={{ border: "4px solid #000", borderRadius: "24px", overflow: "hidden", height: "350px", boxShadow: "8px 8px 0 #000" }}>
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
                    <section key="gallery" id="gallery" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem" : "8rem 5%", textAlign: "center" }}>
                        <div style={{ marginBottom: "3rem" }}>
                            <h2 style={{ fontSize: isMobile ? "2rem" : "3rem", fontWeight: 900 }}>{gallery?.title || "Fun Stuff"}</h2>
                        </div>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "1.5rem"
                        }}>
                            {gallery?.items?.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    {...motionProps}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        width: isMobile ? "100%" : "300px",
                                        backgroundColor: "#fff",
                                        border: "4px solid #000",
                                        borderRadius: "30px",
                                        overflow: "hidden",
                                        boxShadow: "10px 10px 0 #000",
                                        transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`
                                    }}
                                >
                                    <div style={{ height: "200px", overflow: "hidden", borderBottom: "4px solid #000" }}>
                                        <img src={item.url} alt={item.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    {item.caption && (
                                        <div style={{ padding: "1.5rem" }}>
                                            <p style={{ margin: 0, fontWeight: 800, fontSize: "0.9rem" }}>{item.caption}</p>
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
        <div style={{ backgroundColor: "#fffbf2", color: "#2d3436", minHeight: "100vh", fontFamily: "'Outfit', sans-serif", width: "100%", overflowX: "hidden", position: "relative" }}>
            {/* Decorative Background */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: isMobile ? "30vh" : "40vh", backgroundColor: lightColor, borderBottomRightRadius: "60% 20%", borderBottomLeftRadius: "20% 10%", zIndex: 0 }}></div>

            {/* Header */}
            <nav style={{ position: "relative", zIndex: 1, padding: isMobile ? "1.5rem" : "2rem 5%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {brand.logoUrl ? <img src={brand.logoUrl} height={isMobile ? "30" : "40"} /> : (
                        <>
                            <div style={{ width: isMobile ? "32px" : "40px", height: isMobile ? "32px" : "40px", backgroundColor: color, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Sparkles size={isMobile ? 16 : 20} /></div>
                            <div style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 800 }}>{brand.siteName}</div>
                        </>
                    )}
                </div>
            </nav>

            {/* Sticky Mobile Button */}
            {isMobile && contact.showStickyContact && (
                <div style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 1000, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {contact.whatsapp && (
                        <a
                            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                            style={{ width: "34px", height: "34px", borderRadius: "10px", border: "2px solid #000", backgroundColor: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "4px 4px 0 #000" }}
                            title="Chat on WhatsApp"
                        >
                            <MessageCircle size={18} fill="currentColor" />
                        </a>
                    )}
                    <a
                        href={`tel:${contact.phone}`}
                        style={{ width: "34px", height: "34px", borderRadius: "10px", border: "2px solid #000", backgroundColor: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "4px 4px 0 #000" }}
                        title="Call Now"
                    >
                        <Phone size={18} fill="currentColor" />
                    </a>
                </div>
            )}

            {/* Dynamic Body Sections */}
            {sectionOrder.map(renderSection)}

            {/* Footer */}
            <footer style={{ position: "relative", zIndex: 1, padding: isMobile ? "3rem 1.5rem" : "5rem 5%", backgroundColor: "#000", color: "#fff", borderTopLeftRadius: "30px", borderTopRightRadius: "30px", textAlign: "center" }}>
                <div style={{ fontWeight: 900, fontSize: "1.1rem", marginBottom: "0.5rem" }}>{brand.siteName.toUpperCase()}</div>
                <div style={{ fontSize: "0.6rem", color: "#666" }}>MADE WITH LOVE © {new Date().getFullYear()}</div>
            </footer>
        </div>
    );
}
