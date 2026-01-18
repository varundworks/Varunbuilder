import { notFound } from "next/navigation";
import { getCardBySubdomain, getActiveFestivals } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PublicGreetingPage(props: { 
    params: Promise<{ domain: string; festivalId: string }> 
}) {
    const params = await props.params;
    const { domain, festivalId } = params;

    const card = await getCardBySubdomain(domain);
    const festivals = await getActiveFestivals();
    const festival = festivals.find(f => f.id === festivalId);

    if (!card || !festival) {
        notFound();
    }

    const backgroundImages: Record<string, string> = {
        "diwali-2026": "https://images.unsplash.com/photo-1605461884353-81e8b8b2ad14?w=1200&h=800&fit=crop",
        "newyear-2027": "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&h=800&fit=crop",
        "christmas-2026": "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1200&h=800&fit=crop",
        "holi-2026": "https://images.unsplash.com/photo-1583065944748-d9d1baa3fb42?w=1200&h=800&fit=crop",
        "eid-2026": "https://images.unsplash.com/photo-1592940228261-72f4b8f2a3bd?w=1200&h=800&fit=crop",
    };

    const backgroundImage = backgroundImages[festival.id] || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop";

    return (
        <div style={{
            minHeight: "100vh",
            background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage}) center/cover fixed`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            color: "white",
            textAlign: "center"
        }}>
            <div style={{
                maxWidth: "700px",
                padding: "3rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
            }}>
                <h1 style={{
                    fontSize: "3rem",
                    fontWeight: "800",
                    marginBottom: "1.5rem",
                    textShadow: "0 2px 20px rgba(0,0,0,0.5)"
                }}>
                    🎉 {festival.name}
                </h1>

                <p style={{
                    fontSize: "1.3rem",
                    lineHeight: "1.8",
                    marginBottom: "2.5rem",
                    textShadow: "0 1px 10px rgba(0,0,0,0.5)"
                }}>
                    {festival.defaultMessage}
                </p>

                <div style={{
                    padding: "2rem",
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderRadius: "16px",
                    color: "#1f2937",
                    marginBottom: "2rem"
                }}>
                    {card.profilePhoto && (
                        <img 
                            src={card.profilePhoto} 
                            alt={card.name}
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                margin: "0 auto 1rem",
                                objectFit: "cover",
                                border: "4px solid white",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                        />
                    )}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.25rem" }}>
                        {card.name}
                    </h2>
                    <p style={{ fontSize: "1rem", color: card.primaryColor, fontWeight: "600", marginBottom: "0.5rem" }}>
                        {card.title}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                        {card.company}
                    </p>

                    <div style={{ 
                        marginTop: "1.5rem", 
                        paddingTop: "1.5rem", 
                        borderTop: "1px solid #e5e7eb",
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        flexWrap: "wrap"
                    }}>
                        <a
                            href={`tel:${card.phones[0]}`}
                            style={{
                                padding: "0.75rem 1.5rem",
                                backgroundColor: card.primaryColor,
                                color: "white",
                                borderRadius: "8px",
                                textDecoration: "none",
                                fontWeight: "600",
                                fontSize: "0.9rem"
                            }}
                        >
                            📞 Call Now
                        </a>
                        <a
                            href={`https://wa.me/${(card.whatsapp || card.phones[0]).replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            style={{
                                padding: "0.75rem 1.5rem",
                                backgroundColor: "#25D366",
                                color: "white",
                                borderRadius: "8px",
                                textDecoration: "none",
                                fontWeight: "600",
                                fontSize: "0.9rem"
                            }}
                        >
                            💬 WhatsApp
                        </a>
                    </div>
                </div>

                <a
                    href={`/${card.subdomain}`}
                    style={{
                        display: "inline-block",
                        padding: "0.75rem 2rem",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "8px",
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "0.9rem"
                    }}
                >
                    View Full Business Card →
                </a>
            </div>

            <p style={{
                marginTop: "2rem",
                fontSize: "0.8rem",
                opacity: 0.7
            }}>
                Powered by MikiVcard - Digital Business Cards & Festival Greetings
            </p>
        </div>
    );
}
