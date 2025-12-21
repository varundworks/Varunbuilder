"use client";

import { motion } from "framer-motion";
import {
    Cpu, Mail, Phone, Menu, MessageCircle, MapPin, Briefcase, Zap,
    Users, Star, Shield, Heart, Smile, Camera, Globe, Layout,
    Smartphone, Check, CheckCircle2, MousePointer, MousePointer2, Info, ArrowRight,
    Image as ImageIcon
} from "lucide-react";
import { Website } from "@/lib/types";
import { getCtaHref, getGoogleMapsEmbedUrl } from "@/lib/leadActions";

const IconMap: Record<string, any> = {
    Zap, Briefcase, Users, Phone, Mail, Menu, MessageCircle, MapPin, ArrowRight,
    Star, Shield, Heart, Smile, Camera, Globe, Layout, Smartphone, Check, CheckCircle2,
    MousePointer, MousePointer2, Info, Cpu
};

const RenderIcon = ({ name, color, size }: { name?: string, color: string, size: number }) => {
    const Icon = name ? IconMap[name] : null;
    if (!Icon) return <Cpu color={color} size={size} />;
    return <Icon color={color} size={size} />;
};

interface TemplateProps {
    site: Website;
    isMobile?: boolean;
}

export default function DarkTemplate({ site, isMobile = false }: TemplateProps) {
    const { brand, sections, sectionOrder = ["hero", "about", "services", "contact"], animationsEnabled } = site;
    const { hero, about, services, features, gallery, contact } = sections;
    const color = brand.primaryColor;

    const motionProps = animationsEnabled ? {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    } : {};

    const renderSection = (id: string) => {
        switch (id) {
            case "hero":
                return (
                    <section key="hero" id="hero" style={{ position: "relative", zIndex: 1, padding: isMobile ? "5rem 1.5rem" : "8rem 5%", textAlign: "center" }}>
                        <motion.div {...motionProps}>
                            <div style={{
                                display: "inline-block", padding: "0.3rem 1rem", borderRadius: "99px",
                                border: `1px solid ${color}33`, background: `${color}11`,
                                color: color, fontSize: "0.6rem", fontWeight: 800, marginBottom: "2rem"
                            }}>
                                PROTOCOL ACTIVE
                            </div>
                            <h1 style={{
                                fontSize: isMobile ? "2.8rem" : "clamp(3rem, 10vw, 5.5rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "1.5rem",
                                background: `linear-gradient(to bottom, #fff 40%, ${color} 100%)`,
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                lineHeight: 1
                            }}>
                                {hero.headline}
                            </h1>
                            <p style={{
                                fontSize: isMobile ? "1rem" : "1.3rem", color: "#888", maxWidth: "700px", marginInline: "auto",
                                marginBottom: "3rem", lineHeight: 1.5
                            }}>
                                {hero.subheadline}
                            </p>
                            <a
                                href={getCtaHref(hero, contact)}
                                style={{
                                    padding: "1rem 2.5rem", borderRadius: "4px",
                                    backgroundColor: color, color: "#fff", border: "none",
                                    fontSize: "0.9rem", fontWeight: 800,
                                    textDecoration: "none",
                                    display: "inline-block",
                                    boxShadow: `0 0 30px ${color}44`
                                }}
                            >
                                {hero.ctaText}
                            </a>
                        </motion.div>
                    </section>
                );
            case "about":
                return (
                    <section key="about" id="about" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem" : "8rem 5%" }}>
                        <div style={{ maxWidth: "1000px", marginInline: "auto" }}>
                            <h2 style={{ fontSize: isMobile ? "1.6rem" : "2rem", marginBottom: "2rem", borderLeft: `4px solid ${color}`, paddingLeft: "1.5rem" }}>{about.title}</h2>
                            <p style={{ fontSize: isMobile ? "1.1rem" : "1.4rem", color: "#aaa", lineHeight: 1.6 }}>{about.text}</p>
                        </div>
                    </section>
                );
            case "services":
                return (
                    <section key="services" id="services" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem" : "8rem 5%" }}>
                        <div style={{
                            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "1px", backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.05)"
                        }}>
                            {services.map((service, i) => (
                                <div key={service.id} style={{ padding: isMobile ? "2.5rem 1.5rem" : "4rem", backgroundColor: "#001" }}>
                                    <div style={{ color: color, marginBottom: "1.5rem" }}>
                                        <RenderIcon name={service.icon} color={color} size={20} />
                                    </div>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>{service.title}</h3>
                                    <p style={{ color: "#666", lineHeight: 1.6, fontSize: "0.85rem" }}>{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "features":
                return (
                    <section key="features" id="features" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem" : "8rem 5%", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                            {site.sections.features.map((feature, i) => (
                                <div key={feature.id} style={{ padding: "2rem", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "2px" }}>
                                    <div style={{ marginBottom: "1rem" }}>
                                        <RenderIcon name={feature.icon} color={color} size={16} />
                                    </div>
                                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color }}>{feature.title}</h3>
                                    <p style={{ color: "#666", fontSize: "0.85rem" }}>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "contact":
                const mapUrl = getGoogleMapsEmbedUrl(contact.googleMapsUrl);
                return (
                    <section key="contact" id="contact" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem" : "8rem 5%", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "5rem" }}>
                            <div style={{ maxWidth: "400px" }}>
                                <h3 style={{ fontSize: "2rem", marginBottom: "3rem", background: `linear-gradient(to right, #fff, ${color})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Connect.</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                    <div>
                                        <div style={{ fontSize: "0.6rem", fontWeight: 800, color: color, letterSpacing: "2px", marginBottom: "0.5rem" }}>ENDPOINT: EMAIL</div>
                                        <a href={`mailto:${contact.email}`} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#fff", fontSize: "1.1rem", textDecoration: "none" }}>
                                            <Mail size={16} color={color} /> {contact.email}
                                        </a>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.6rem", fontWeight: 800, color: color, letterSpacing: "2px", marginBottom: "0.5rem" }}>ENDPOINT: VOICE</div>
                                        <a href={`tel:${contact.phone}`} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#fff", fontSize: "1.1rem", textDecoration: "none" }}>
                                            <Phone size={16} color={color} /> {contact.phone}
                                        </a>
                                    </div>
                                    {contact.whatsapp && (
                                        <div>
                                            <div style={{ fontSize: "0.6rem", fontWeight: 800, color: color, letterSpacing: "2px", marginBottom: "0.5rem" }}>ENDPOINT: SECURE CHAT</div>
                                            <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#fff", fontSize: "1.1rem", textDecoration: "none" }}>
                                                <MessageCircle size={16} color={color} /> WhatsApp
                                            </a>
                                        </div>
                                    )}
                                    {contact.address && (
                                        <div>
                                            <div style={{ fontSize: "0.6rem", fontWeight: 800, color: color, letterSpacing: "2px", marginBottom: "0.5rem" }}>PHYSICAL LOCATION</div>
                                            <div style={{ display: "flex", alignItems: "start", gap: "1rem", color: "#888", fontSize: "0.9rem", lineHeight: 1.5 }}>
                                                <MapPin size={16} color={color} style={{ marginTop: "3px" }} /> {contact.address}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {mapUrl && (
                                <div style={{ borderRadius: "4px", overflow: "hidden", height: "400px", border: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, border: `1px solid ${color}22`, pointerEvents: "none", zIndex: 1 }}></div>
                                    <iframe
                                        src={mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </section>
                );
            case "gallery":
                return (
                    <section key="gallery" id="gallery" style={{ position: "relative", zIndex: 1, padding: isMobile ? "4rem 1.5rem" : "8rem 5%", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <div style={{ fontSize: "0.6rem", fontWeight: 800, color: color, letterSpacing: "4px", marginBottom: "1rem" }}>VISUAL OVERRIDE</div>
                            <h2 style={{ fontSize: isMobile ? "2rem" : "3rem", fontWeight: 900 }}>{gallery?.title || "Visuals"}</h2>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                            gap: "1rem"
                        }}>
                            {gallery?.items?.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    {...motionProps}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        position: "relative",
                                        aspectRatio: "16/9",
                                        overflow: "hidden",
                                        border: "1px solid rgba(255,255,255,0.1)"
                                    }}
                                >
                                    <img src={item.url} alt={item.caption} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7, transition: "0.5s" }} />
                                    <div style={{
                                        position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem",
                                        background: "linear-gradient(to top, #000, transparent)",
                                        display: "flex", justifyContent: "space-between", alignItems: "flex-end"
                                    }}>
                                        <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>{item.caption}</p>
                                        <div style={{ width: "20px", height: "1px", backgroundColor: color }}></div>
                                    </div>
                                    <style>{`
                                        #gallery div:hover img { opacity: 1; transform: scale(1.05); }
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
        <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", fontFamily: "'Inter', sans-serif", width: "100%", position: "relative" }}>
            {/* Mesh Gradient Background */}
            <div style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                background: `radial-gradient(circle at 80% 20%, ${color}15 0%, transparent 40%), radial-gradient(circle at 20% 80%, ${color}10 0%, transparent 40%)`,
                zIndex: 0,
                pointerEvents: "none"
            }}></div>

            {/* Header */}
            <nav style={{
                position: "sticky", top: 0, zIndex: 100,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: isMobile ? "1rem" : "1rem 5%", backdropFilter: "blur(20px)",
                background: "rgba(0,0,0,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.05)"
            }}>
                <div style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 800, letterSpacing: "-1px" }}>
                    {brand.logoUrl ? <img src={brand.logoUrl} height={isMobile ? "20" : "24"} /> : `${brand.siteName.toUpperCase().split(' ')[0]}.`}
                </div>
                <a
                    href={`tel:${contact.phone}`}
                    style={{
                        padding: "0.5rem 1.2rem", borderRadius: "4px",
                        backgroundColor: "#fff", color: "#000", border: "none",
                        fontWeight: 800, fontSize: "0.7rem", textDecoration: "none"
                    }}
                >
                    {isMobile ? "CALL" : "CONNECT NOW"}
                </a>
            </nav>

            {/* Sticky Mobile Button */}
            {isMobile && contact.showStickyContact && (
                <div style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 1000, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {contact.whatsapp && (
                        <a
                            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                            style={{ width: "34px", height: "34px", borderRadius: "4px", backgroundColor: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)" }}
                            title="Chat on WhatsApp"
                        >
                            <MessageCircle size={18} fill="currentColor" />
                        </a>
                    )}
                    <a
                        href={`tel:${contact.phone}`}
                        style={{ width: "34px", height: "34px", borderRadius: "4px", backgroundColor: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)" }}
                        title="Call Now"
                    >
                        <Phone size={18} fill="currentColor" />
                    </a>
                </div>
            )}

            {/* Dynamic Body Sections */}
            {sectionOrder.map(renderSection)}

            {/* Footer */}
            <footer style={{ position: "relative", zIndex: 1, padding: "3rem 1.5rem", textAlign: "center", color: "#333", fontSize: "0.65rem" }}>
                © {new Date().getFullYear()} {brand.siteName.toUpperCase()} INFRASTRUCTURE.
            </footer>
        </div>
    );
}
