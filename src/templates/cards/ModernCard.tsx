"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe, Facebook, Instagram, Linkedin, Twitter, Youtube, Share2, MessageCircle, Star, Send, CreditCard, Image as ImageIcon, Video, Eye, QrCode } from "lucide-react";
import { BusinessCard } from "@/lib/types";
import { useState, useEffect } from "react";

interface ModernCardProps {
    card: BusinessCard;
    isMobile?: boolean;
}

export default function ModernCard({ card, isMobile = false }: ModernCardProps) {
    const { 
        name, title, company, tagline, bio, phones, email, whatsapp, website, 
        address, city, state, country, pincode, profilePhoto, companyLogo, coverImage, 
        primaryColor, secondaryColor, socialLinks, features, hours,
        category, yearOfEst, natureOfBusiness, specialities, products, payment, 
        gallery, videos, enableProducts, enableGallery, enablePayment, enableFeedback, 
        enableContactForm, viewCount
    } = card;
    
    const phone = phones && phones.length > 0 ? phones[0] : "";
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const handleWhatsAppShare = () => {
        const text = `Check out my digital business card: ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleCall = () => {
        window.location.href = `tel:${phone}`;
    };

    const handleEmail = () => {
        window.location.href = `mailto:${email}`;
    };

    const handleWhatsAppChat = () => {
        const number = whatsapp || phone;
        window.open(`https://wa.me/${number.replace(/[^0-9]/g, '')}`, '_blank');
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {/* View Counter */}
            {viewCount && (
                <div style={{ 
                    position: "sticky", 
                    top: 0, 
                    zIndex: 50, 
                    backgroundColor: "rgba(255,255,255,0.95)", 
                    backdropFilter: "blur(10px)",
                    padding: "0.75rem 1rem", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    gap: "0.5rem",
                    borderBottom: "1px solid #e5e7eb",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}>
                    <Eye size={16} color={primaryColor} />
                    <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1f2937" }}>
                        Views: {viewCount.toLocaleString()}
                    </span>
                </div>
            )}

            {/* Cover Section */}
            <div style={{
                height: isMobile ? "200px" : "250px",
                background: coverImage 
                    ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${coverImage}) center/cover`
                    : `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                position: "relative"
            }}>
                {companyLogo && (
                    <img 
                        src={companyLogo} 
                        alt={company}
                        style={{
                            position: "absolute",
                            top: "1rem",
                            left: "1rem",
                            height: "40px",
                            width: "auto",
                            filter: "brightness(0) invert(1)"
                        }}
                    />
                )}
            </div>

            {/* Profile Section */}
            <div style={{ maxWidth: "600px", margin: "0 auto", padding: isMobile ? "0 1rem" : "0 2rem", position: "relative" }}>
                {/* Profile Photo */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        width: isMobile ? "120px" : "150px",
                        height: isMobile ? "120px" : "150px",
                        borderRadius: "50%",
                        border: "6px solid white",
                        overflow: "hidden",
                        marginTop: isMobile ? "-60px" : "-75px",
                        backgroundColor: "#e5e7eb",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                    }}
                >
                    {profilePhoto ? (
                        <img src={profilePhoto} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontWeight: "bold", color: primaryColor }}>
                            {name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </motion.div>

                {/* Name & Title */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginTop: "1.5rem", textAlign: "left" }}
                >
                    <h1 style={{ fontSize: isMobile ? "1.75rem" : "2.25rem", fontWeight: "800", marginBottom: "0.25rem", color: "#1f2937" }}>
                        {name}
                    </h1>
                    <p style={{ fontSize: isMobile ? "1rem" : "1.125rem", color: primaryColor, fontWeight: "600", marginBottom: "0.5rem" }}>
                        {title}
                    </p>
                    <p style={{ fontSize: "0.95rem", color: "#6b7280", fontWeight: "500" }}>
                        {company}
                    </p>
                    {tagline && (
                        <p style={{ fontSize: "0.9rem", color: "#9ca3af", fontStyle: "italic", marginTop: "0.5rem" }}>
                            "{tagline}"
                        </p>
                    )}
                </motion.div>

                {/* Bio */}
                {bio && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            marginTop: "2rem",
                            padding: "1.25rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            fontSize: "0.95rem",
                            lineHeight: "1.7",
                            color: "#4b5563"
                        }}
                    >
                        {bio}
                    </motion.div>
                )}

                {/* Quick Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        marginTop: "2rem",
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
                        gap: "1rem"
                    }}
                >
                    <button
                        onClick={handleCall}
                        style={{
                            padding: "1rem",
                            backgroundColor: primaryColor,
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                            boxShadow: `0 4px 12px ${primaryColor}40`
                        }}
                    >
                        <Phone size={20} />
                        Call
                    </button>

                    <button
                        onClick={handleWhatsAppChat}
                        style={{
                            padding: "1rem",
                            backgroundColor: "#25D366",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                            boxShadow: "0 4px 12px rgba(37, 211, 102, 0.25)"
                        }}
                    >
                        <MessageCircle size={20} />
                        WhatsApp
                    </button>

                    <button
                        onClick={handleEmail}
                        style={{
                            padding: "1rem",
                            backgroundColor: secondaryColor,
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                            boxShadow: `0 4px 12px ${secondaryColor}40`
                        }}
                    >
                        <Mail size={20} />
                        Email
                    </button>

                    <button
                        onClick={handleWhatsAppShare}
                        style={{
                            padding: "1rem",
                            backgroundColor: "white",
                            color: primaryColor,
                            border: `2px solid ${primaryColor}`,
                            borderRadius: "12px",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: "600",
                            fontSize: "0.85rem"
                        }}
                    >
                        <Share2 size={20} />
                        Share
                    </button>
                </motion.div>

                {/* Contact Details */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        marginTop: "2rem",
                        backgroundColor: "white",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                    }}
                >
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1.25rem", color: "#1f2937" }}>
                        Contact Information
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {phone && (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: `${primaryColor}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Phone size={18} color={primaryColor} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: "600" }}>Phone</div>
                                    <div style={{ fontSize: "0.9rem", color: "#1f2937", fontWeight: "500" }}>{phone}</div>
                                </div>
                            </div>
                        )}
                        {email && (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: `${primaryColor}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Mail size={18} color={primaryColor} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: "600" }}>Email</div>
                                    <div style={{ fontSize: "0.9rem", color: "#1f2937", fontWeight: "500" }}>{email}</div>
                                </div>
                            </div>
                        )}
                        {website && (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: `${primaryColor}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Globe size={18} color={primaryColor} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: "600" }}>Website</div>
                                    <a href={website} target="_blank" style={{ fontSize: "0.9rem", color: primaryColor, fontWeight: "500", textDecoration: "none" }}>{website}</a>
                                </div>
                            </div>
                        )}
                        {(address || city) && (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: `${primaryColor}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <MapPin size={18} color={primaryColor} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: "600" }}>Location</div>
                                    <div style={{ fontSize: "0.9rem", color: "#1f2937", fontWeight: "500" }}>
                                        {address && `${address}, `}{city}{country && `, ${country}`}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Services */}
                {features && features.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                            Services & Expertise
                        </h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {features.map((feature: string, index: number) => (
                                <span
                                    key={index}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        backgroundColor: `${primaryColor}10`,
                                        color: primaryColor,
                                        borderRadius: "20px",
                                        fontSize: "0.85rem",
                                        fontWeight: "600"
                                    }}
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                        {hours && (
                            <div style={{ marginTop: "1rem", padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "8px", fontSize: "0.85rem", color: "#6b7280" }}>
                                <strong>Business Hours:</strong> {hours}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Social Links */}
                {(socialLinks.facebook || socialLinks.instagram || socialLinks.linkedin || socialLinks.twitter || socialLinks.youtube) && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                            Links
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {socialLinks.facebook && (
                                <a href={socialLinks.facebook} target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "12px", textDecoration: "none" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                                        <Facebook size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1f2937" }}>Facebook</div>
                                        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Follow us for updates</div>
                                    </div>
                                </a>
                            )}
                            {socialLinks.instagram && (
                                <a href={socialLinks.instagram} target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "12px", textDecoration: "none" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                                        <Instagram size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1f2937" }}>Instagram</div>
                                        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Follow our journey</div>
                                    </div>
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a href={socialLinks.twitter} target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "12px", textDecoration: "none" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#1DA1F2", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                                        <Twitter size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1f2937" }}>X (Twitter)</div>
                                        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Connect with us</div>
                                    </div>
                                </a>
                            )}
                            {socialLinks.linkedin && (
                                <a href={socialLinks.linkedin} target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "12px", textDecoration: "none" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#0A66C2", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                                        <Linkedin size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1f2937" }}>LinkedIn</div>
                                        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Connect on Linkedin</div>
                                    </div>
                                </a>
                            )}
                            {socialLinks.youtube && (
                                <a href={socialLinks.youtube} target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "12px", textDecoration: "none" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                                        <Youtube size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1f2937" }}>Youtube</div>
                                        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Watch our latest videos</div>
                                    </div>
                                </a>
                            )}
                            {socialLinks.otherLink && (
                                <a href={socialLinks.otherLink} target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "12px", textDecoration: "none" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1f2937" }}>Other Link</div>
                                        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Visit our link</div>
                                    </div>
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* About Us / Company Details */}
                {(category || yearOfEst || natureOfBusiness) && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.75 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                            About Us
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
                            {company && (
                                <div style={{ display: "flex" }}>
                                    <span style={{ fontWeight: "600", color: "#6b7280", minWidth: "140px" }}>Company Name:</span>
                                    <span style={{ color: "#1f2937" }}>{company}</span>
                                </div>
                            )}
                            {category && (
                                <div style={{ display: "flex" }}>
                                    <span style={{ fontWeight: "600", color: "#6b7280", minWidth: "140px" }}>Category:</span>
                                    <span style={{ color: "#1f2937" }}>{category}</span>
                                </div>
                            )}
                            {yearOfEst && (
                                <div style={{ display: "flex" }}>
                                    <span style={{ fontWeight: "600", color: "#6b7280", minWidth: "140px" }}>Year of Est.:</span>
                                    <span style={{ color: "#1f2937" }}>{yearOfEst}</span>
                                </div>
                            )}
                            {natureOfBusiness && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                    <span style={{ fontWeight: "600", color: "#6b7280" }}>Nature Of Business:</span>
                                    <span style={{ color: "#1f2937", marginLeft: 0 }}>{natureOfBusiness}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Our Specialities */}
                {specialities && specialities.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                            Our Specialities
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {specialities.map((spec: string, index: number) => (
                                <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: primaryColor }}></div>
                                    <span style={{ fontSize: "0.9rem", color: "#4b5563" }}>{spec}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Products/Services */}
                {enableProducts && products && products.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.85 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1.5rem", color: "#1f2937" }}>
                            Products/Services
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {products.map((product, index) => (
                                <div key={product.id} style={{ padding: "1.25rem", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        {product.image && (
                                            <img src={product.image} alt={product.name} style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }} />
                                        )}
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#1f2937", marginBottom: "0.5rem" }}>
                                                {product.name}
                                            </h4>
                                            <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem", lineHeight: "1.5" }}>
                                                {product.description}
                                            </p>
                                            {product.price && (
                                                <div style={{ fontSize: "1rem", fontWeight: "700", color: primaryColor }}>
                                                    {product.price}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        style={{
                                            marginTop: "0.75rem",
                                            width: "100%",
                                            padding: "0.65rem",
                                            backgroundColor: primaryColor,
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontSize: "0.85rem",
                                            fontWeight: "600",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Enquiry
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Payment Section */}
                {enablePayment && payment && (payment.paytm || payment.phonepe || payment.googlepay || payment.bankName) && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                            Payment
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
                            {payment.paytm && (
                                <div style={{ display: "flex" }}>
                                    <span style={{ fontWeight: "600", color: "#6b7280", minWidth: "160px" }}>Paytm Number:</span>
                                    <span style={{ color: "#1f2937" }}>{payment.paytm}</span>
                                </div>
                            )}
                            {payment.phonepe && (
                                <div style={{ display: "flex" }}>
                                    <span style={{ fontWeight: "600", color: "#6b7280", minWidth: "160px" }}>Phone Pe Number:</span>
                                    <span style={{ color: "#1f2937" }}>{payment.phonepe}</span>
                                </div>
                            )}
                            {payment.googlepay && (
                                <div style={{ display: "flex" }}>
                                    <span style={{ fontWeight: "600", color: "#6b7280", minWidth: "160px" }}>Google Pay Number:</span>
                                    <span style={{ color: "#1f2937" }}>{payment.googlepay}</span>
                                </div>
                            )}
                            {(payment.bankName || payment.accountNumber || payment.ifscCode) && (
                                <>
                                    <div style={{ fontWeight: "700", marginTop: "0.5rem", color: "#1f2937" }}>Account Details:</div>
                                    {payment.bankName && (
                                        <div style={{ display: "flex" }}>
                                            <span style={{ fontWeight: "600", color: "#6b7280", minWidth: "160px" }}>Bank Name:</span>
                                            <span style={{ color: "#1f2937" }}>{payment.bankName}</span>
                                        </div>
                                    )}
                                    {payment.ifscCode && (
                                        <div style={{ display: "flex" }}>
                                            <span style={{ fontWeight: "600", color: "#6b7280", minWidth: "160px" }}>IFSC code:</span>
                                            <span style={{ color: "#1f2937" }}>{payment.ifscCode}</span>
                                        </div>
                                    )}
                                    {payment.accountNumber && (
                                        <div style={{ display: "flex" }}>
                                            <span style={{ fontWeight: "600", color: "#6b7280", minWidth: "160px" }}>Account Number:</span>
                                            <span style={{ color: "#1f2937" }}>{payment.accountNumber}</span>
                                        </div>
                                    )}
                                </>
                            )}
                            {(payment.qrCode || payment.qrCodeImage) && (
                                <div style={{ marginTop: "1rem" }}>
                                    <div style={{ fontWeight: "700", marginBottom: "0.75rem", color: "#1f2937" }}>QR codes:</div>
                                    <img src={payment.qrCode || payment.qrCodeImage} alt="Payment QR Code" style={{ width: "180px", height: "180px", borderRadius: "12px", border: "2px solid #e5e7eb" }} />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Gallery */}
                {enableGallery && gallery && gallery.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.95 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                            Gallery
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "0.75rem" }}>
                            {gallery.map((imageUrl, index) => (
                                <div key={index} style={{ position: "relative", paddingTop: "100%", backgroundColor: "#f3f4f6", borderRadius: "12px", overflow: "hidden" }}>
                                    <img src={imageUrl} alt={`Gallery ${index + 1}`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Videos */}
                {videos && videos.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                            Videos
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {videos.map((videoId, index) => (
                                <div key={index} style={{ position: "relative", paddingTop: "56.25%", backgroundColor: "#000", borderRadius: "12px", overflow: "hidden" }}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Feedback Section */}
                {enableFeedback && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.05 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                            Feedbacks
                        </h3>
                        <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "1rem" }}>
                            No feedbacks yet. Be the first to leave a review!
                        </p>
                        <div style={{ padding: "1.5rem", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
                            <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                Give Feedback
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div>
                                    <label style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem", display: "block" }}>Select a Rating</label>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} size={24} color="#fbbf24" fill="#fbbf24" style={{ cursor: "pointer" }} />
                                        ))}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                />
                                <textarea
                                    placeholder="Enter your feedback"
                                    rows={3}
                                    style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%", resize: "vertical" }}
                                />
                                <button style={{
                                    padding: "0.75rem",
                                    backgroundColor: primaryColor,
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                }}>
                                    Submit Feedback
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Enquiry Form */}
                {enableContactForm && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        style={{
                            marginTop: "2rem",
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                            Enquiry Form
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <input
                                type="text"
                                placeholder="Enter Full Name"
                                style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                            />
                            <input
                                type="tel"
                                placeholder="Enter Phone Number"
                                style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                            />
                            <input
                                type="email"
                                placeholder="Enter Email"
                                style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                            />
                            <textarea
                                placeholder="Enter Message"
                                rows={4}
                                style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%", resize: "vertical" }}
                            />
                            <button style={{
                                padding: "0.75rem",
                                backgroundColor: primaryColor,
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem"
                            }}>
                                <Send size={18} /> Send Message
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Share Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.15 }}
                    style={{
                        marginTop: "2rem",
                        backgroundColor: "white",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        textAlign: "center"
                    }}
                >
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                        Share
                    </h3>
                    {currentUrl && (
                        <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "1rem" }}>
                            {currentUrl}
                        </p>
                    )}
                    <div style={{ marginBottom: "1rem" }}>
                        <div style={{ fontWeight: "600", fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>Scan below QR to open profile:</div>
                        <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
                            <div style={{ padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "12px", border: "2px solid #e5e7eb" }}>
                                <QrCode size={120} color={primaryColor} />
                            </div>
                        </div>
                        <button style={{
                            padding: "0.65rem 1.5rem",
                            backgroundColor: "#f3f4f6",
                            color: "#1f2937",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}>
                            Save QR
                        </button>
                    </div>
                    <div style={{ marginTop: "1.5rem" }}>
                        <div style={{ fontWeight: "600", fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.75rem" }}>Share profile to any whatsapp number:</div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <input
                                type="tel"
                                placeholder="Enter WhatsApp Number"
                                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                            />
                            <button style={{
                                padding: "0.75rem 1.5rem",
                                backgroundColor: "#25D366",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}>
                                Share
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Save Contact Button */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{ marginTop: "2rem", marginBottom: "3rem" }}
                >
                    <button
                        onClick={() => {
                            // Generate vCard and download
                            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${title}
ORG:${company}
TEL:${phone}
EMAIL:${email}
${website ? `URL:${website}` : ''}
${address ? `ADR:;;${address};${city};;${country}` : ''}
END:VCARD`;
                            const blob = new Blob([vcard], { type: 'text/vcard' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${name.replace(/\s+/g, '_')}.vcf`;
                            a.click();
                        }}
                        style={{
                            width: "100%",
                            padding: "1rem",
                            backgroundColor: primaryColor,
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            fontWeight: "700",
                            fontSize: "1rem",
                            boxShadow: `0 8px 20px ${primaryColor}40`
                        }}
                    >
                        💾 Save to Contacts
                    </button>
                </motion.div>

                {/* Footer Badge */}
                <div style={{ textAlign: "center", paddingBottom: "2rem", paddingTop: "1rem" }}>
                    <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                        Powered by <strong style={{ color: primaryColor }}>Vstudio</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
