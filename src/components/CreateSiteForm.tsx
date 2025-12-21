"use client";

import { useState } from "react";

export default function CreateSiteForm() {
    const [subdomain, setSubdomain] = useState("");
    const [created, setCreated] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (subdomain) {
            setCreated(true);
        }
    };

    return (
        <div style={{
            padding: "2rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            background: "white",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>Create your own site</h3>
            {!created ? (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label htmlFor="subdomain" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#4b5563" }}>
                            Enter subdomain name
                        </label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                id="subdomain"
                                type="text"
                                placeholder="my-cool-site"
                                value={subdomain}
                                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-0-]/g, ""))}
                                style={{
                                    flex: 1,
                                    padding: "0.75rem",
                                    borderRadius: "6px 0 0 6px",
                                    border: "1px solid #d1d5db",
                                    outline: "none"
                                }}
                                required
                            />
                            <span style={{
                                padding: "0.75rem",
                                background: "#f3f4f6",
                                border: "1px solid #d1d5db",
                                borderLeft: "none",
                                borderRadius: "0 6px 6px 0",
                                color: "#6b7280"
                            }}>
                                .lvh.me:3000
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            background: "#1a1a1a",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        Create Site
                    </button>
                </form>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#059669", fontWeight: 600, marginBottom: "1rem" }}>Success! Your demo site is ready.</p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        You can now visit: <br />
                        <a
                            href={`http://${subdomain}.lvh.me:3000`}
                            target="_blank"
                            style={{ fontWeight: 700, color: "#2563eb", textDecoration: "underline" }}
                        >
                            {subdomain}.lvh.me:3000
                        </a>
                    </p>
                    <button
                        onClick={() => setCreated(false)}
                        style={{ fontSize: "0.85rem", color: "#6b7280", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                    >
                        Create another
                    </button>
                    <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#9ca3af" }}>
                        Note: This works because of our Middleware routing. In this demo, unknown sites will show a 404 if they aren't in our hardcoded list, unless you modify the tenant page to handle any subdomain.
                    </p>
                </div>
            )}
        </div>
    );
}
