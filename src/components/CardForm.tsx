"use client";

import { useState } from "react";
import { BusinessCard } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Phone, Mail, MapPin, Globe, Palette, Share2, Loader2, CheckCircle2, AlertCircle, Instagram, Facebook, Linkedin, Twitter, Youtube, MessageCircle } from "lucide-react";

const CARD_TEMPLATES = [
    { id: "modern", name: "Modern", preview: "#6366f1" },
    { id: "minimal", name: "Minimal", preview: "#64748b" },
    { id: "professional", name: "Professional", preview: "#0f172a" },
    { id: "colorful", name: "Colorful", preview: "#ec4899" },
    { id: "elegant", name: "Elegant", preview: "#8b5cf6" },
];

export default function CardForm() {
    const [step, setStep] = useState(1);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<BusinessCard>>({
        templateId: "modern",
        name: "",
        title: "",
        company: "",
        tagline: "",
        bio: "",
        phone: "",
        email: "",
        whatsapp: "",
        website: "",
        address: "",
        city: "",
        country: "",
        profilePhoto: "",
        companyLogo: "",
        coverImage: "",
        primaryColor: "#6366f1",
        secondaryColor: "#0f172a",
        socialLinks: {},
        services: [],
        hours: "",
        enableGreetings: true,
        enableContactForm: false,
        subdomain: ""
    });

    const [serviceInput, setServiceInput] = useState("");

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateSocialLink = (platform: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [platform]: value }
        }));
    };

    const addService = () => {
        if (serviceInput.trim()) {
            setFormData(prev => ({
                ...prev,
                services: [...(prev.services || []), serviceInput.trim()]
            }));
            setServiceInput("");
        }
    };

    const removeService = (index: number) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services?.filter((_, i) => i !== index) || []
        }));
    };

    const handlePublish = async () => {
        if (!formData.subdomain || !formData.name || !formData.phone) {
            setError("Please fill in required fields: Name, Phone, and Subdomain");
            return;
        }

        setIsPublishing(true);
        setError(null);

        try {
            const response = await fetch("/api/cards/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    status: "PUBLISHED"
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to publish");

            setPublishedUrl(data.url);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsPublishing(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>Choose Your Template</h2>
                        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>Select a design that matches your brand</p>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
                            {CARD_TEMPLATES.map(template => (
                                <button
                                    key={template.id}
                                    onClick={() => updateField("templateId", template.id)}
                                    style={{
                                        padding: "1.5rem",
                                        borderRadius: "12px",
                                        border: formData.templateId === template.id ? `3px solid ${template.preview}` : "2px solid #e5e7eb",
                                        backgroundColor: formData.templateId === template.id ? `${template.preview}10` : "white",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    <div style={{ width: "100%", height: "80px", borderRadius: "8px", backgroundColor: template.preview, marginBottom: "0.75rem" }}></div>
                                    <div style={{ fontWeight: "600", fontSize: "0.9rem" }}>{template.name}</div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>Basic Information</h2>
                        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>Tell us about yourself</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    Full Name <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => updateField("name", e.target.value)}
                                    placeholder="John Doe"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    Job Title <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => updateField("title", e.target.value)}
                                    placeholder="Marketing Manager"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    Company <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={e => updateField("company", e.target.value)}
                                    placeholder="Acme Inc"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    Tagline (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.tagline}
                                    onChange={e => updateField("tagline", e.target.value)}
                                    placeholder="Building brands that matter"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    Bio (Optional)
                                </label>
                                <textarea
                                    value={formData.bio}
                                    onChange={e => updateField("bio", e.target.value)}
                                    placeholder="A brief description about you and your work..."
                                    rows={4}
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem", resize: "vertical" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>Contact Details</h2>
                        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>How can people reach you?</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    <Phone size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                                    Phone Number <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => updateField("phone", e.target.value)}
                                    placeholder="+91 98765 43210"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    <Mail size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                                    Email Address <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => updateField("email", e.target.value)}
                                    placeholder="john@example.com"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    <MessageCircle size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                                    WhatsApp (Optional)
                                </label>
                                <input
                                    type="tel"
                                    value={formData.whatsapp}
                                    onChange={e => updateField("whatsapp", e.target.value)}
                                    placeholder="+91 98765 43210"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    <Globe size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                                    Website (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={e => updateField("website", e.target.value)}
                                    placeholder="https://example.com"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>City</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={e => updateField("city", e.target.value)}
                                        placeholder="Mumbai"
                                        style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>Country</label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={e => updateField("country", e.target.value)}
                                        placeholder="India"
                                        style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    <MapPin size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                                    Address (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={e => updateField("address", e.target.value)}
                                    placeholder="123 Business Street"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                );

            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>Social Media & Services</h2>
                        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>Connect your social profiles</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    <Facebook size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    value={formData.socialLinks?.facebook || ""}
                                    onChange={e => updateSocialLink("facebook", e.target.value)}
                                    placeholder="https://facebook.com/yourpage"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    <Instagram size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    value={formData.socialLinks?.instagram || ""}
                                    onChange={e => updateSocialLink("instagram", e.target.value)}
                                    placeholder="https://instagram.com/yourprofile"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    <Linkedin size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    value={formData.socialLinks?.linkedin || ""}
                                    onChange={e => updateSocialLink("linkedin", e.target.value)}
                                    placeholder="https://linkedin.com/in/yourprofile"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    Services/Expertise (Optional)
                                </label>
                                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                    <input
                                        type="text"
                                        value={serviceInput}
                                        onChange={e => setServiceInput(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addService())}
                                        placeholder="e.g., Digital Marketing"
                                        style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                    />
                                    <button
                                        onClick={addService}
                                        style={{ padding: "0.75rem 1.5rem", borderRadius: "8px", backgroundColor: formData.primaryColor, color: "white", border: "none", cursor: "pointer", fontWeight: "600" }}
                                    >
                                        Add
                                    </button>
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {formData.services?.map((service, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                padding: "0.5rem 0.75rem",
                                                backgroundColor: `${formData.primaryColor}15`,
                                                color: formData.primaryColor,
                                                borderRadius: "20px",
                                                fontSize: "0.85rem",
                                                fontWeight: "600",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem"
                                            }}
                                        >
                                            {service}
                                            <button
                                                onClick={() => removeService(index)}
                                                style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, fontSize: "1.1rem", lineHeight: 1 }}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    Business Hours (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.hours}
                                    onChange={e => updateField("hours", e.target.value)}
                                    placeholder="Mon-Fri: 9 AM - 6 PM"
                                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.95rem" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                );

            case 5:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>Customize & Publish</h2>
                        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>Final touches to your digital card</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    <Palette size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                                    Brand Colors
                                </label>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                    <div>
                                        <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>Primary Color</div>
                                        <input
                                            type="color"
                                            value={formData.primaryColor}
                                            onChange={e => updateField("primaryColor", e.target.value)}
                                            style={{ width: "100%", height: "50px", borderRadius: "8px", border: "1px solid #e5e7eb", cursor: "pointer" }}
                                        />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>Secondary Color</div>
                                        <input
                                            type="color"
                                            value={formData.secondaryColor}
                                            onChange={e => updateField("secondaryColor", e.target.value)}
                                            style={{ width: "100%", height: "50px", borderRadius: "8px", border: "1px solid #e5e7eb", cursor: "pointer" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                    Your Card URL <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <div style={{ display: "flex", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
                                    <input
                                        type="text"
                                        value={formData.subdomain}
                                        onChange={e => updateField("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                        placeholder="your-name"
                                        style={{ flex: 1, padding: "0.75rem", border: "none", fontSize: "0.95rem" }}
                                    />
                                    <div style={{ padding: "0.75rem 1rem", backgroundColor: "#f3f4f6", fontSize: "0.85rem", color: "#6b7280", fontWeight: "600" }}>
                                        .lvh.me
                                    </div>
                                </div>
                                <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                                    Use only lowercase letters, numbers, and hyphens
                                </p>
                            </div>

                            <div style={{ padding: "1rem", backgroundColor: "#f0f9ff", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.enableGreetings}
                                        onChange={e => updateField("enableGreetings", e.target.checked)}
                                        style={{ width: "18px", height: "18px", cursor: "pointer" }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: "600", fontSize: "0.9rem" }}>Enable Festival Greetings</div>
                                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Share personalized greetings with your contacts on festivals</div>
                                    </div>
                                </label>
                            </div>

                            {publishedUrl ? (
                                <div style={{ padding: "2rem", backgroundColor: "#f0fdf4", borderRadius: "16px", border: "1px solid #22c55e", textAlign: "center" }}>
                                    <div style={{ width: "48px", height: "48px", backgroundColor: "#22c55e", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h3 style={{ fontWeight: "800", marginBottom: "0.5rem" }}>Your Card is Live! 🎉</h3>
                                    <p style={{ fontSize: "0.85rem", color: "#166534", marginBottom: "1rem" }}>Share it with your contacts via WhatsApp</p>
                                    <a
                                        href={publishedUrl}
                                        target="_blank"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            padding: "0.75rem 1.5rem",
                                            backgroundColor: "#fff",
                                            border: "1px solid #22c55e",
                                            borderRadius: "8px",
                                            color: "#166534",
                                            fontWeight: "700",
                                            textDecoration: "none",
                                            marginBottom: "0.5rem"
                                        }}
                                    >
                                        View Card <Share2 size={16} />
                                    </a>
                                    <br />
                                    <button
                                        onClick={() => {
                                            const text = `Check out my digital business card: ${publishedUrl}`;
                                            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                        }}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            padding: "0.75rem 1.5rem",
                                            backgroundColor: "#25D366",
                                            border: "none",
                                            borderRadius: "8px",
                                            color: "white",
                                            fontWeight: "700",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <MessageCircle size={16} /> Share on WhatsApp
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handlePublish}
                                    disabled={isPublishing || !formData.subdomain || !formData.name || !formData.phone}
                                    style={{
                                        width: "100%",
                                        padding: "1rem",
                                        backgroundColor: isPublishing || !formData.subdomain ? "#e5e7eb" : formData.primaryColor,
                                        color: "#fff",
                                        borderRadius: "12px",
                                        border: "none",
                                        fontWeight: "800",
                                        fontSize: "1rem",
                                        cursor: isPublishing || !formData.subdomain ? "not-allowed" : "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "0.75rem"
                                    }}
                                >
                                    {isPublishing ? (
                                        <>
                                            <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <Share2 size={20} />
                                            Publish My Card
                                        </>
                                    )}
                                </button>
                            )}

                            {error && (
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "1rem", backgroundColor: "#fee2e2", borderRadius: "8px", color: "#991b1b" }}>
                                    <AlertCircle size={18} />
                                    {error}
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "2rem" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                {/* Progress Bar */}
                <div style={{ marginBottom: "3rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                        {[1, 2, 3, 4, 5].map(num => (
                            <div
                                key={num}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    backgroundColor: step >= num ? formData.primaryColor : "#e5e7eb",
                                    color: step >= num ? "white" : "#9ca3af",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "700",
                                    fontSize: "0.9rem"
                                }}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                    <div style={{ height: "4px", backgroundColor: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(step / 5) * 100}%`, backgroundColor: formData.primaryColor, transition: "width 0.3s" }}></div>
                    </div>
                </div>

                {/* Form Content */}
                <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                {!publishedUrl && (
                    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                style={{
                                    flex: 1,
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    border: "1px solid #e5e7eb",
                                    backgroundColor: "white",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                }}
                            >
                                Previous
                            </button>
                        )}
                        {step < 5 && (
                            <button
                                onClick={() => setStep(step + 1)}
                                style={{
                                    flex: 1,
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    border: "none",
                                    backgroundColor: formData.primaryColor,
                                    color: "white",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                }}
                            >
                                Next Step
                            </button>
                        )}
                    </div>
                )}
            </div>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
