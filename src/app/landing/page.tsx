export default function LandingPage() {
    return (
        <div style={{ 
            minHeight: "100vh", 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "system-ui, -apple-system, sans-serif"
        }}>
            <div style={{ 
                maxWidth: "1200px", 
                width: "100%",
                textAlign: "center",
                color: "white"
            }}>
                <h1 style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    fontWeight: "900",
                    marginBottom: "1.5rem",
                    textShadow: "0 4px 20px rgba(0,0,0,0.3)"
                }}>
                    MikiVcard
                </h1>
                
                <p style={{
                    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                    marginBottom: "3rem",
                    opacity: 0.95,
                    maxWidth: "800px",
                    margin: "0 auto 3rem"
                }}>
                    Digital Business Cards & Festival Greetings
                    <br />
                    <span style={{ fontSize: "0.9em", opacity: 0.8 }}>
                        WhatsApp-First | Mobile-Optimized | Made for India
                    </span>
                </p>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2rem",
                    marginBottom: "4rem"
                }}>
                    <div style={{
                        padding: "2rem",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.2)"
                    }}>
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💼</div>
                        <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.75rem" }}>
                            Digital Business Cards
                        </h3>
                        <p style={{ opacity: 0.9, lineHeight: "1.6" }}>
                            Professional, mobile-friendly cards with vCard download and instant WhatsApp sharing
                        </p>
                    </div>

                    <div style={{
                        padding: "2rem",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.2)"
                    }}>
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                        <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.75rem" }}>
                            Festival Greetings
                        </h3>
                        <p style={{ opacity: 0.9, lineHeight: "1.6" }}>
                            Send branded wishes on Diwali, Holi, Eid, Christmas - keep your business top of mind
                        </p>
                    </div>

                    <div style={{
                        padding: "2rem",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.2)"
                    }}>
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📱</div>
                        <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.75rem" }}>
                            WhatsApp-First
                        </h3>
                        <p style={{ opacity: 0.9, lineHeight: "1.6" }}>
                            One-click sharing to WhatsApp contacts and groups - reach customers instantly
                        </p>
                    </div>
                </div>

                <a
                    href="/home"
                    style={{
                        display: "inline-block",
                        padding: "1.25rem 3rem",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        backgroundColor: "white",
                        color: "#667eea",
                        borderRadius: "50px",
                        textDecoration: "none",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                        transition: "transform 0.2s",
                        marginBottom: "2rem"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                    Create Your Card - Free →
                </a>

                <div style={{
                    marginTop: "4rem",
                    padding: "2rem",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.15)"
                }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }}>
                        Perfect For:
                    </h4>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1.5rem",
                        flexWrap: "wrap",
                        fontSize: "0.95rem",
                        opacity: 0.9
                    }}>
                        <span>🏪 Small Businesses</span>
                        <span>✨ Freelancers</span>
                        <span>🔧 Service Providers</span>
                        <span>💼 Sales Professionals</span>
                        <span>🎨 Creators</span>
                    </div>
                </div>

                <p style={{
                    marginTop: "3rem",
                    fontSize: "0.9rem",
                    opacity: 0.7
                }}>
                    Demo Card: <a href="/demo" style={{ color: "white", textDecoration: "underline" }}>demo.lvh.me:3000</a>
                </p>
            </div>
        </div>
    );
}
