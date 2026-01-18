"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, Briefcase, Zap, Users, Phone, Mail, Menu, MessageCircle, MapPin, Navigation,
    Star, Shield, Heart, Smile, Camera, Globe, Layout, Smartphone, Check, CheckCircle2,
    MousePointer, MousePointer2, Info, Image as ImageIcon
} from "lucide-react";
import { Website } from "@/lib/types";
import { getCtaHref, getGoogleMapsEmbedUrl } from "@/lib/leadActions";

const IconMap: Record<string, any> = {
    Zap, Briefcase, Users, Phone, Mail, Menu, MessageCircle, MapPin, Navigation, ArrowRight,
    Star, Shield, Heart, Smile, Camera, Globe, Layout, Smartphone, Check, CheckCircle2,
    MousePointer, MousePointer2, Info
};

const RenderIcon = ({ name, color, size }: { name?: string, color: string, size: number }) => {
    const Icon = name ? IconMap[name] : null;
    if (!Icon) return <Briefcase color={color} size={size} />;
    return <Icon color={color} size={size} />;
};

interface TemplateProps {
    site: Website;
    isMobile?: boolean;
}

export default function ModernTemplate({ site, isMobile = false }: TemplateProps) {
    const { brand, sections, sectionOrder = ["hero", "about", "services", "features", "contact"], animationsEnabled } = site;
    const { hero, about, services, features, gallery, contact } = sections;
    const primaryColor = brand.primaryColor;
    const secondaryColor = brand.secondaryColor;
    const lightPrimary = `${primaryColor}15`;

    const motionProps = animationsEnabled ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    } : {};

    const renderSection = (id: string) => {
        switch (id) {
            case "hero":
                return (
                    <section key="hero" id="hero" style={{
                        padding: isMobile ? "4rem 1rem" : "8rem 5%",
                        textAlign: "center",
                        background: `radial-gradient(circle at 50% 0%, ${lightPrimary} 0%, transparent 50%)`
                    }}>
                        <motion.div {...motionProps}>
                            <h1 style={{
                                fontSize: isMobile ? "2.5rem" : "clamp(3rem, 8vw, 5rem)",
                                marginBottom: "1.5rem",
                                maxWidth: "900px",
                                marginInline: "auto",
                                lineHeight: 1.1,
                                fontWeight: 800
                            }}>
                                {hero.headline}
                            </h1>
                            <p style={{
                                fontSize: isMobile ? "1rem" : "1.25rem",
                                color: "#666",
                                maxWidth: "600px",
                                marginInline: "auto",
                                marginBottom: "3rem",
                                lineHeight: 1.6
                            }}>
                                {hero.subheadline}
                            </p>
                            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                                <a
                                    href={getCtaHref(hero, contact)}
                                    style={{
                                        padding: isMobile ? "1rem 1.5rem" : "1.2rem 2.5rem",
                                        borderRadius: "12px",
                                        backgroundColor: primaryColor,
                                        color: "#fff",
                                        textDecoration: "none",
                                        fontSize: isMobile ? "0.9rem" : "1.1rem",
                                        fontWeight: 600,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        boxShadow: `0 20px 40px -10px ${primaryColor}44`
                                    }}
                                >
                                    {hero.ctaText} <ArrowRight size={20} />
                                </a>
                            </div>
                        </motion.div>
                    </section>
                );
            case "about":
                return (
                    <section key="about" id="about" style={{ padding: isMobile ? "4rem 1rem" : "8rem 5%", backgroundColor: "#fcfcfc" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "5rem", alignItems: "center" }}>
                            <motion.div {...motionProps} style={{ order: isMobile ? 2 : 1 }}>
                                <h2 style={{ fontSize: isMobile ? "1.8rem" : "2.5rem", marginBottom: "1.5rem" }}>{about.title}</h2>
                                <p style={{ color: "#666", lineHeight: 1.8, fontSize: isMobile ? "0.95rem" : "1.1rem" }}>
                                    {about.text}
                                </p>
                            </motion.div>
                            <div style={{
                                backgroundColor: lightPrimary,
                                borderRadius: "32px",
                                aspectRatio: "1/1",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                order: isMobile ? 1 : 2
                            }}>
                                <Users size={isMobile ? 80 : 120} color={primaryColor} style={{ opacity: 0.5 }} />
                            </div>
                        </div>
                    </section>
                );
            case "services":
                return (
                    <section key="services" id="services" style={{ padding: isMobile ? "4rem 1rem" : "8rem 5%" }}>
                        <h2 style={{ textAlign: "center", fontSize: isMobile ? "1.8rem" : "2.5rem", marginBottom: isMobile ? "2rem" : "4rem" }}>Our Services</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                            {services.map((service, i) => (
                                <motion.div
                                    key={service.id}
                                    {...motionProps}
                                    transition={{ delay: i * 0.1 }}
                                    style={{ padding: isMobile ? "1.5rem" : "3rem", borderRadius: "24px", border: "1px solid #f0f0f0", textAlign: "center" }}
                                >
                                    <div style={{ marginBottom: "1.5rem", display: "inline-block" }}>
                                        <RenderIcon name={service.icon} color={primaryColor} size={isMobile ? 24 : 32} />
                                    </div>
                                    <h3 style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", marginBottom: "0.75rem" }}>{service.title}</h3>
                                    <p style={{ color: "#666", fontSize: "0.9rem" }}>{service.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                );
            case "features":
                return (
                    <section key="features" id="features" style={{ padding: isMobile ? "4rem 1rem" : "8rem 5%", backgroundColor: "#f9fafb" }}>
                        <h2 style={{ textAlign: "center", fontSize: isMobile ? "1.8rem" : "2.5rem", marginBottom: isMobile ? "2rem" : "5rem" }}>Core Features</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                            {features.map((feature, i) => (
                                <motion.div
                                    key={feature.id}
                                    {...motionProps}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        padding: isMobile ? "1.5rem" : "3rem",
                                        borderRadius: "24px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
                                    }}
                                >
                                    <div style={{ marginBottom: "1.5rem" }}>
                                        <RenderIcon name={feature.icon} color={primaryColor} size={isMobile ? 24 : 32} />
                                    </div>
                                    <h3 style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", marginBottom: "0.75rem" }}>{feature.title}</h3>
                                    <p style={{ color: "#666", lineHeight: 1.6, fontSize: "0.9rem" }}>{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                );
            case "contact":
                const mapUrl = getGoogleMapsEmbedUrl(contact.googleMapsUrl);
                return (
                    <section key="contact" id="contact" style={{ padding: isMobile ? "4rem 1rem" : "8rem 5%" }}>
                        <div style={{
                            backgroundColor: secondaryColor,
                            borderRadius: isMobile ? "20px" : "32px",
                            padding: isMobile ? "3rem 1.5rem" : "5rem",
                            color: "#fff",
                            display: "flex",
                            flexDirection: "column",
                            gap: "3rem"
                        }}>
                            <div style={{ textAlign: "center" }}>
                                <h2 style={{ fontSize: isMobile ? "2rem" : "3rem", marginBottom: "2rem" }}>Get in Touch</h2>
                                <div style={{ display: "flex", gap: isMobile ? "1.5rem" : "4rem", flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", justifyContent: "center" }}>
                                    <a href={`tel:${contact.phone}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: isMobile ? "0.9rem" : "1rem", color: "inherit", textDecoration: "none" }}>
                                        <Phone size={18} /> {contact.phone}
                                    </a>
                                    <a href={`mailto:${contact.email}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: isMobile ? "0.9rem" : "1rem", color: "inherit", textDecoration: "none" }}>
                                        <Mail size={18} /> {contact.email}
                                    </a>
                                    {contact.whatsapp && (
                                        <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: isMobile ? "0.9rem" : "1rem", color: "inherit", textDecoration: "none" }}>
                                            <MessageCircle size={18} /> WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>

                            {(contact.address || mapUrl) && (
                                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem", alignItems: "start" }}>
                                    {contact.address && (
                                        <div style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "2rem", borderRadius: "20px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", color: primaryColor }}>
                                                <MapPin size={24} />
                                                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Visit Us</h3>
                                            </div>
                                            <p style={{ color: "#ccc", lineHeight: 1.6 }}>{contact.address}</p>
                                        </div>
                                    )}
                                    {mapUrl && (
                                        <div style={{ borderRadius: "20px", overflow: "hidden", height: "300px", border: "1px solid rgba(255,255,255,0.1)" }}>
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
                    <section key="gallery" id="gallery" style={{ padding: isMobile ? "4rem 1rem" : "8rem 5%", backgroundColor: "#fff" }}>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <h2 style={{ fontSize: isMobile ? "1.8rem" : "2.5rem", marginBottom: "1rem" }}>{gallery?.title || "Gallery"}</h2>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "1.5rem",
                            maxWidth: "1200px",
                            marginInline: "auto"
                        }}>
                            {gallery?.items?.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    {...motionProps}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        position: "relative",
                                        borderRadius: "24px",
                                        overflow: "hidden",
                                        aspectRatio: "4/3",
                                        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)"
                                    }}
                                >
                                    <img src={item.url} alt={item.caption} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.5s" }} />
                                    {item.caption && (
                                        <div style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            padding: "2rem 1.5rem 1.5rem",
                                            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                                            color: "#fff"
                                        }}>
                                            <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 500 }}>{item.caption}</p>
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
        <div style={{ backgroundColor: "#fff", color: "#000", overflowX: "hidden", scrollBehavior: "smooth", width: "100%", position: "relative" }}>
            {/* Sticky Mobile Button */}
            {isMobile && contact.showStickyContact && (
                <div style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 1000, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {contact.whatsapp && (
                        <a
                            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                            style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(37, 211, 102, 0.3)" }}
                            title="Chat on WhatsApp"
                        >
                            <MessageCircle size={18} fill="currentColor" />
                        </a>
                    )}
                    <a
                        href={`tel:${contact.phone}`}
                        style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: primaryColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 10px ${primaryColor}44` }}
                        title="Call Now"
                    >
                        <Phone size={18} fill="currentColor" />
                    </a>
                </div>
            )}

            {/* Navigation */}
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: isMobile ? "1rem" : "1.5rem 5%",
                borderBottom: "1px solid #f0f0f0",
                backgroundColor: "#fff",
                position: "sticky",
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {brand.logoUrl ? (
                        <img src={brand.logoUrl} alt={brand.siteName} style={{ height: isMobile ? "24px" : "32px", width: "auto" }} />
                    ) : (
                        <div style={{ fontSize: isMobile ? "1.1rem" : "1.5rem", fontWeight: 800, color: primaryColor }}>{brand.siteName}</div>
                    )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <a
                        href={`tel:${contact.phone}`}
                        style={{
                            padding: isMobile ? "0.4rem 1rem" : "0.6rem 1.5rem",
                            borderRadius: "99px",
                            backgroundColor: primaryColor,
                            color: "#fff",
                            border: "none",
                            fontWeight: 600,
                            textDecoration: "none",
                            fontSize: isMobile ? "0.8rem" : "0.9rem"
                        }}
                    >
                        Call Now
                    </a>
                </div>
            </nav>

            {/* Dynamic Body Sections */}
            {sectionOrder.map(renderSection)}

            {/* Footer */}
            <footer style={{ padding: isMobile ? "3rem 1rem" : "5rem 5% 3rem", backgroundColor: "#fafafa", borderTop: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", flexDirection: isMobile ? "column" : "row", textAlign: "center" }}>
                    <div style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 800, color: primaryColor }}>{brand.siteName}</div>
                    <p style={{ color: "#999", fontSize: "0.8rem" }}>
                        © {new Date().getFullYear()} {brand.siteName}.
                    </p>
                </div>
            </footer>
        </div>
    );
}
