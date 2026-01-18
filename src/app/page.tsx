export default function RootPage() {
    return (
        <main style={{ 
            display: "flex", 
            minHeight: "100vh", 
            alignItems: "center", 
            justifyContent: "center",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        }}>
            <div style={{ textAlign: "center", color: "white" }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "1rem" }}>
                    Vstudio
                </h1>
                <p style={{ fontSize: "1.25rem", opacity: 0.9, marginBottom: "2rem" }}>
                    Create Beautiful Digital Business Cards
                </p>
                <a 
                    href="/home" 
                    style={{
                        display: "inline-block",
                        padding: "1rem 2rem",
                        backgroundColor: "white",
                        color: "#667eea",
                        borderRadius: "12px",
                        fontWeight: "700",
                        textDecoration: "none",
                        fontSize: "1.1rem",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                    }}
                >
                    Get Started →
                </a>
            </div>
        </main>
    );
}
