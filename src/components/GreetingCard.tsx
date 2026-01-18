"use client";

import { BusinessCard, FestivalGreeting } from "@/lib/types";
import { Share2, Calendar } from "lucide-react";
import { useState } from "react";

interface GreetingCardProps {
    card: BusinessCard;
    festival: FestivalGreeting;
}

const GREETING_BACKGROUNDS: Record<string, string> = {
    "diwali-2026": "https://images.unsplash.com/photo-1605461884353-81e8b8b2ad14?w=1200&h=800&fit=crop",
    "newyear-2027": "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&h=800&fit=crop",
    "christmas-2026": "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1200&h=800&fit=crop",
    "holi-2026": "https://images.unsplash.com/photo-1583065944748-d9d1baa3fb42?w=1200&h=800&fit=crop",
    "eid-2026": "https://images.unsplash.com/photo-1592940228261-72f4b8f2a3bd?w=1200&h=800&fit=crop",
};

export default function GreetingCard({ card, festival }: GreetingCardProps) {
    const [customMessage, setCustomMessage] = useState(festival.defaultMessage);
    const [showCustomize, setShowCustomize] = useState(false);

    const backgroundImage = GREETING_BACKGROUNDS[festival.id] || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop";

    const handleShare = () => {
        const greetingUrl = `${window.location.origin}/${card.subdomain}/greeting/${festival.id}`;
        const text = `${customMessage}\n\n${card.name}\n${card.title} at ${card.company}\n${greetingUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>
            {/* Greeting Preview */}
            <div style={{
                height: "300px",
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage}) center/cover`,
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white",
                position: "relative"
            }}>
                <div style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                }}>
                    <Calendar size={14} />
                    {formatDate(festival.date)}
                </div>

                <h2 style={{
                    fontSize: "2.5rem",
                    fontWeight: "800",
                    marginBottom: "1rem",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)"
                }}>
                    {festival.name}
                </h2>

                {!showCustomize ? (
                    <p style={{
                        fontSize: "1.1rem",
                        lineHeight: "1.7",
                        maxWidth: "600px",
                        textShadow: "0 1px 5px rgba(0,0,0,0.3)"
                    }}>
                        {customMessage}
                    </p>
                ) : (
                    <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        style={{
                            width: "100%",
                            maxWidth: "600px",
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "none",
                            fontSize: "1rem",
                            lineHeight: "1.7",
                            minHeight: "120px",
                            backgroundColor: "rgba(255,255,255,0.95)",
                            color: "#1f2937"
                        }}
                    />
                )}

                <div style={{
                    marginTop: "1.5rem",
                    padding: "1rem 1.5rem",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.2)"
                }}>
                    <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>{card.name}</div>
                    <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>{card.title}</div>
                    <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>{card.company}</div>
                </div>
            </div>

            {/* Actions */}
            <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                        onClick={() => setShowCustomize(!showCustomize)}
                        style={{
                            flex: 1,
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: `2px solid ${card.primaryColor}`,
                            backgroundColor: "white",
                            color: card.primaryColor,
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        {showCustomize ? "Preview" : "Customize Message"}
                    </button>

                    <button
                        onClick={handleShare}
                        style={{
                            flex: 1,
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "#25D366",
                            color: "white",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem"
                        }}
                    >
                        <Share2 size={18} />
                        Share on WhatsApp
                    </button>
                </div>

                <p style={{
                    marginTop: "1rem",
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    textAlign: "center"
                }}>
                    Your contact details will be included when shared
                </p>
            </div>
        </div>
    );
}
