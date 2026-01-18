"use client";

import { useState, useEffect } from "react";
import { BusinessCard, ProductItem } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { 
    User, Briefcase, Phone, Mail, MapPin, Globe, Palette, 
    Share2, Loader2, CheckCircle2, AlertCircle, Instagram, 
    Facebook, Linkedin, Twitter, Youtube, MessageCircle, 
    Monitor, Smartphone, Plus, Trash2, Image as ImageIcon,
    Video, Star, Send, CreditCard, Settings as SettingsIcon,
    Calendar, Sparkles, Eye
} from "lucide-react";
import ModernCard from "@/templates/cards/ModernCard";
import ElegantCard from "@/templates/cards/ElegantCard";
import VibrantCard from "@/templates/cards/VibrantCard";
import PeacefulCard from "@/templates/cards/PeacefulCard";

const CARD_TEMPLATES = [
    { 
        id: "modern", 
        name: "Modern", 
        preview: "#6366f1",
        component: ModernCard,
        description: "Clean and professional design",
        mockData: {
            name: "John Doe",
            title: "Digital Marketing Expert",
            company: "Creative Solutions",
            primaryColor: "#6366f1",
            secondaryColor: "#0f172a"
        }
    },
    { 
        id: "minimal", 
        name: "Minimal", 
        preview: "#64748b",
        component: ModernCard,
        description: "Simple and elegant layout",
        mockData: {
            name: "Sarah Smith",
            title: "Brand Consultant",
            company: "Minimal Agency",
            primaryColor: "#64748b",
            secondaryColor: "#1e293b"
        }
    },
    { 
        id: "professional", 
        name: "Professional", 
        preview: "#0f172a",
        component: ModernCard,
        description: "Corporate and trustworthy",
        mockData: {
            name: "Michael Chen",
            title: "Business Advisor",
            company: "Pro Consulting",
            primaryColor: "#0f172a",
            secondaryColor: "#334155"
        }
    },
    { 
        id: "elegant", 
        name: "Elegant", 
        preview: "#8b7355",
        component: ElegantCard,
        description: "Sophisticated serif design",
        mockData: {
            name: "Emma Williams",
            title: "Creative Director",
            company: "Elegant Studios",
            primaryColor: "#8b7355",
            secondaryColor: "#5a4a3a"
        }
    },
    { 
        id: "vibrant", 
        name: "Vibrant", 
        preview: "#ff6b6b",
        component: VibrantCard,
        description: "Bold and energetic colors",
        mockData: {
            name: "Alex Rodriguez",
            title: "Marketing Specialist",
            company: "Dynamic Brands",
            primaryColor: "#ff6b6b",
            secondaryColor: "#4ecdc4"
        }
    },
    { 
        id: "peaceful", 
        name: "Peaceful", 
        preview: "#6ba562",
        component: PeacefulCard,
        description: "Calm and nature-inspired",
        mockData: {
            name: "Olivia Green",
            title: "Wellness Coach",
            company: "Peaceful Living",
            primaryColor: "#6ba562",
            secondaryColor: "#4a7c42"
        }
    },
];

export default function CardBuilder() {
    const [activeTab, setActiveTab] = useState<"card" | "greeting" | "settings">("card");
    const [cardSection, setCardSection] = useState<"templates" | "builder">("templates");
    const [viewMode, setViewMode] = useState<"desktop" | "mobile">("mobile");
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<BusinessCard>>({
        templateId: "modern",
        name: "",
        title: "",
        company: "",
        category: "",
        yearOfEst: "",
        natureOfBusiness: "",
        tagline: "",
        bio: "",
        phones: [""],
        email: "",
        whatsapp: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        profilePhoto: "",
        companyLogo: "",
        coverImage: "",
        primaryColor: "#6366f1",
        secondaryColor: "#0f172a",
        socialLinks: {},
        specialities: [],
        hours: "",
        products: [],
        features: [],
        payment: {},
        gallery: [],
        videos: [],
        enableGreetings: true,
        enableContactForm: true,
        enableFeedback: true,
        enableGallery: true,
        enableProducts: true,
        enablePayment: true,
        subdomain: ""
    });

    const [builderStep, setBuilderStep] = useState(1);

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addPhone = () => {
        setFormData(prev => ({
            ...prev,
            phones: [...(prev.phones || [""]), ""]
        }));
    };

    const updatePhone = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            phones: prev.phones?.map((p, i) => i === index ? value : p) || []
        }));
    };

    const removePhone = (index: number) => {
        setFormData(prev => ({
            ...prev,
            phones: prev.phones?.filter((_, i) => i !== index) || []
        }));
    };

    const addProduct = () => {
        const newProduct: ProductItem = {
            id: Date.now().toString(),
            name: "",
            description: "",
            price: "",
            image: ""
        };
        setFormData(prev => ({
            ...prev,
            products: [...(prev.products || []), newProduct]
        }));
    };

    const updateProduct = (id: string, field: keyof ProductItem, value: string) => {
        setFormData(prev => ({
            ...prev,
            products: prev.products?.map(p => 
                p.id === id ? { ...p, [field]: value } : p
            ) || []
        }));
    };

    const removeProduct = (id: string) => {
        setFormData(prev => ({
            ...prev,
            products: prev.products?.filter(p => p.id !== id) || []
        }));
    };

    const handlePublish = async () => {
        if (!formData.subdomain || !formData.name || !formData.phones?.[0]) {
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

    // Template Selection Screen
    if (cardSection === "templates") {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "2rem" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>
                            Choose Your Template
                        </h1>
                        <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                            Select a beautiful design for your digital business card
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
                        {CARD_TEMPLATES.map(template => {
                            const TemplateComponent = template.component;
                            return (
                                <div
                                    key={template.id}
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                        cursor: "pointer",
                                        transition: "transform 0.2s",
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    {/* Preview */}
                                    <div style={{ height: "400px", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
                                        <div style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%", height: "250%" }}>
                                            <TemplateComponent 
                                                card={{
                                                    templateId: template.id,
                                                    ...template.mockData,
                                                    phones: ["+91 98765 43210"],
                                                    email: "demo@example.com",
                                                    bio: "Experienced professional helping businesses grow",
                                                    socialLinks: { facebook: "#", instagram: "#", linkedin: "#" },
                                                    products: [],
                                                    features: ["Expert Consultation", "24/7 Support"],
                                                    payment: {},
                                                    gallery: [],
                                                    videos: [],
                                                    enableGreetings: true,
                                                    enableContactForm: true,
                                                    enableFeedback: true,
                                                    enableGallery: true,
                                                    enableProducts: true,
                                                    enablePayment: true,
                                                    subdomain: "demo",
                                                    id: "demo",
                                                    status: "PUBLISHED",
                                                    createdAt: new Date().toISOString(),
                                                    updatedAt: new Date().toISOString(),
                                                } as BusinessCard} 
                                                isMobile={true} 
                                            />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div style={{ padding: "1.5rem" }}>
                                        <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                                            {template.name}
                                        </h3>
                                        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "1rem" }}>
                                            {template.description}
                                        </p>
                                        <button
                                            onClick={() => {
                                                updateField("templateId", template.id);
                                                updateField("primaryColor", template.mockData.primaryColor);
                                                updateField("secondaryColor", template.mockData.secondaryColor);
                                                setCardSection("builder");
                                            }}
                                            style={{
                                                width: "100%",
                                                padding: "0.75rem",
                                                backgroundColor: template.preview,
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontWeight: "600",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Use This Template
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // Main Builder Interface
    return (
        <div style={{ display: "flex", height: "100vh", backgroundColor: "#fff" }}>
            {/* Left Sidebar - Form */}
            <div style={{ width: "450px", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ padding: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "1rem" }}>
                        Vstudio Builder
                    </h2>

                    {/* Tab Navigation */}
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                        <button
                            onClick={() => setActiveTab("card")}
                            style={{
                                flex: 1,
                                padding: "0.75rem",
                                backgroundColor: activeTab === "card" ? "#6366f1" : "#f9fafb",
                                color: activeTab === "card" ? "white" : "#6b7280",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem"
                            }}
                        >
                            <User size={16} /> Business Card
                        </button>
                        <button
                            onClick={() => setActiveTab("greeting")}
                            style={{
                                flex: 1,
                                padding: "0.75rem",
                                backgroundColor: activeTab === "greeting" ? "#6366f1" : "#f9fafb",
                                color: activeTab === "greeting" ? "white" : "#6b7280",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem"
                            }}
                        >
                            <Calendar size={16} /> Greetings
                        </button>
                        <button
                            onClick={() => setActiveTab("settings")}
                            style={{
                                flex: 1,
                                padding: "0.75rem",
                                backgroundColor: activeTab === "settings" ? "#6366f1" : "#f9fafb",
                                color: activeTab === "settings" ? "white" : "#6b7280",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem"
                            }}
                        >
                            <SettingsIcon size={16} /> Settings
                        </button>
                    </div>

                    {/* Change Template Button - Only show in Card tab */}
                    {activeTab === "card" && (
                        <button
                            onClick={() => setCardSection("templates")}
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                backgroundColor: "#f9fafb",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                color: "#6b7280",
                                fontWeight: "600"
                            }}
                        >
                            ← Change Template
                        </button>
                    )}
                </div>

                {/* Form Content - Scrollable */}
                <div style={{ flex: 1, overflow: "auto", padding: "1.5rem" }}>
                    {/* BUSINESS CARD TAB */}
                    {activeTab === "card" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {/* Basic Info */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Basic Information
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                        value={formData.name}
                                        onChange={e => updateField("name", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Job Title *"
                                        value={formData.title}
                                        onChange={e => updateField("title", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Company Name *"
                                        value={formData.company}
                                        onChange={e => updateField("company", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Business Category"
                                        value={formData.category}
                                        onChange={e => updateField("category", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Tagline"
                                        value={formData.tagline}
                                        onChange={e => updateField("tagline", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <textarea
                                        placeholder="About Your Business"
                                        value={formData.bio}
                                        onChange={e => updateField("bio", e.target.value)}
                                        rows={4}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%", resize: "vertical" }}
                                    />
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Contact Details
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {formData.phones?.map((phone, index) => (
                                        <div key={index} style={{ display: "flex", gap: "0.5rem" }}>
                                            <input
                                                type="tel"
                                                placeholder={`Phone Number ${index + 1} *`}
                                                value={phone}
                                                onChange={e => updatePhone(index, e.target.value)}
                                                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                            />
                                            {index > 0 && (
                                                <button
                                                    onClick={() => removePhone(index)}
                                                    style={{ padding: "0.75rem", backgroundColor: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "8px", cursor: "pointer" }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={addPhone}
                                        style={{
                                            padding: "0.5rem",
                                            backgroundColor: "#f3f4f6",
                                            border: "1px dashed #d1d5db",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            fontSize: "0.85rem",
                                            color: "#6b7280"
                                        }}
                                    >
                                        + Add Another Phone
                                    </button>

                                    <input
                                        type="email"
                                        placeholder="Email Address *"
                                        value={formData.email}
                                        onChange={e => updateField("email", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="WhatsApp Number"
                                        value={formData.whatsapp}
                                        onChange={e => updateField("whatsapp", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="url"
                                        placeholder="Website URL"
                                        value={formData.website}
                                        onChange={e => updateField("website", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Location
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={e => updateField("address", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={e => updateField("city", e.target.value)}
                                            style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="State"
                                            value={formData.state}
                                            onChange={e => updateField("state", e.target.value)}
                                            style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        <input
                                            type="text"
                                            placeholder="Country"
                                            value={formData.country}
                                            onChange={e => updateField("country", e.target.value)}
                                            style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Pincode"
                                            value={formData.pincode}
                                            onChange={e => updateField("pincode", e.target.value)}
                                            style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Social Media Links
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <Facebook size={20} color="#1877f2" />
                                        <input
                                            type="url"
                                            placeholder="Facebook URL"
                                            value={formData.socialLinks?.facebook || ""}
                                            onChange={e => updateField("socialLinks", { ...formData.socialLinks, facebook: e.target.value })}
                                            style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <Instagram size={20} color="#e4405f" />
                                        <input
                                            type="url"
                                            placeholder="Instagram URL"
                                            value={formData.socialLinks?.instagram || ""}
                                            onChange={e => updateField("socialLinks", { ...formData.socialLinks, instagram: e.target.value })}
                                            style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <Twitter size={20} color="#1da1f2" />
                                        <input
                                            type="url"
                                            placeholder="X (Twitter) URL"
                                            value={formData.socialLinks?.twitter || ""}
                                            onChange={e => updateField("socialLinks", { ...formData.socialLinks, twitter: e.target.value })}
                                            style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <Linkedin size={20} color="#0a66c2" />
                                        <input
                                            type="url"
                                            placeholder="LinkedIn URL"
                                            value={formData.socialLinks?.linkedin || ""}
                                            onChange={e => updateField("socialLinks", { ...formData.socialLinks, linkedin: e.target.value })}
                                            style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <Youtube size={20} color="#ff0000" />
                                        <input
                                            type="url"
                                            placeholder="YouTube URL"
                                            value={formData.socialLinks?.youtube || ""}
                                            onChange={e => updateField("socialLinks", { ...formData.socialLinks, youtube: e.target.value })}
                                            style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <Globe size={20} color="#6b7280" />
                                        <input
                                            type="url"
                                            placeholder="Other Link"
                                            value={formData.socialLinks?.otherLink || ""}
                                            onChange={e => updateField("socialLinks", { ...formData.socialLinks, otherLink: e.target.value })}
                                            style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Specialities */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Our Specialities
                                </h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                                    {formData.specialities?.map((spec, index) => (
                                        <div key={index} style={{ padding: "0.5rem 1rem", backgroundColor: formData.primaryColor + "20", borderRadius: "20px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <span style={{ fontSize: "0.85rem" }}>{spec}</span>
                                            <button
                                                onClick={() => updateField("specialities", formData.specialities?.filter((_, i) => i !== index))}
                                                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#ef4444" }}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <input
                                        type="text"
                                        placeholder="Add speciality"
                                        id="new-speciality"
                                        onKeyPress={e => {
                                            if (e.key === "Enter") {
                                                const input = e.target as HTMLInputElement;
                                                if (input.value.trim()) {
                                                    updateField("specialities", [...(formData.specialities || []), input.value.trim()]);
                                                    input.value = "";
                                                }
                                            }
                                        }}
                                        style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                    />
                                    <button
                                        onClick={() => {
                                            const input = document.getElementById("new-speciality") as HTMLInputElement;
                                            if (input.value.trim()) {
                                                updateField("specialities", [...(formData.specialities || []), input.value.trim()]);
                                                input.value = "";
                                            }
                                        }}
                                        style={{ padding: "0.75rem 1rem", backgroundColor: formData.primaryColor, color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Products/Services */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Products / Services
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {formData.products?.map(product => (
                                        <div key={product.id} style={{ padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "8px", backgroundColor: "#fafafa" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                                                <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Product Item</span>
                                                <button
                                                    onClick={() => removeProduct(product.id)}
                                                    style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                                <input
                                                    type="text"
                                                    placeholder="Product Name"
                                                    value={product.name}
                                                    onChange={e => updateProduct(product.id, "name", e.target.value)}
                                                    style={{ padding: "0.65rem", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "0.9rem" }}
                                                />
                                                <textarea
                                                    placeholder="Description"
                                                    value={product.description}
                                                    onChange={e => updateProduct(product.id, "description", e.target.value)}
                                                    rows={2}
                                                    style={{ padding: "0.65rem", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "0.9rem", resize: "vertical" }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Price (e.g., ₹500)"
                                                    value={product.price}
                                                    onChange={e => updateProduct(product.id, "price", e.target.value)}
                                                    style={{ padding: "0.65rem", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "0.9rem" }}
                                                />
                                                <input
                                                    type="url"
                                                    placeholder="Image URL"
                                                    value={product.image}
                                                    onChange={e => updateProduct(product.id, "image", e.target.value)}
                                                    style={{ padding: "0.65rem", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "0.9rem" }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addProduct}
                                        style={{
                                            padding: "0.75rem",
                                            backgroundColor: formData.primaryColor,
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "0.5rem",
                                            fontWeight: "600"
                                        }}
                                    >
                                        <Plus size={20} /> Add Product
                                    </button>
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Payment Details
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input
                                        type="tel"
                                        placeholder="Paytm Number"
                                        value={formData.payment?.paytm || ""}
                                        onChange={e => updateField("payment", { ...formData.payment, paytm: e.target.value })}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="PhonePe Number"
                                        value={formData.payment?.phonepe || ""}
                                        onChange={e => updateField("payment", { ...formData.payment, phonepe: e.target.value })}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Google Pay Number"
                                        value={formData.payment?.googlepay || ""}
                                        onChange={e => updateField("payment", { ...formData.payment, googlepay: e.target.value })}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Bank Name"
                                        value={formData.payment?.bankName || ""}
                                        onChange={e => updateField("payment", { ...formData.payment, bankName: e.target.value })}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Account Number"
                                        value={formData.payment?.accountNumber || ""}
                                        onChange={e => updateField("payment", { ...formData.payment, accountNumber: e.target.value })}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="IFSC Code"
                                        value={formData.payment?.ifscCode || ""}
                                        onChange={e => updateField("payment", { ...formData.payment, ifscCode: e.target.value })}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="url"
                                        placeholder="Payment QR Code Image URL"
                                        value={formData.payment?.qrCode || ""}
                                        onChange={e => updateField("payment", { ...formData.payment, qrCode: e.target.value })}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                </div>
                            </div>

                            {/* Gallery */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Photo Gallery
                                </h3>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1rem" }}>
                                    {formData.gallery?.map((url, index) => (
                                        <div key={index} style={{ position: "relative", paddingTop: "100%", backgroundColor: "#f3f4f6", borderRadius: "8px", overflow: "hidden" }}>
                                            <img src={url} alt={`Gallery ${index + 1}`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                                            <button
                                                onClick={() => updateField("gallery", formData.gallery?.filter((_, i) => i !== index))}
                                                style={{ position: "absolute", top: "0.25rem", right: "0.25rem", padding: "0.25rem", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <input
                                        type="url"
                                        placeholder="Image URL"
                                        id="new-gallery-image"
                                        onKeyPress={e => {
                                            if (e.key === "Enter") {
                                                const input = e.target as HTMLInputElement;
                                                if (input.value.trim()) {
                                                    updateField("gallery", [...(formData.gallery || []), input.value.trim()]);
                                                    input.value = "";
                                                }
                                            }
                                        }}
                                        style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                    />
                                    <button
                                        onClick={() => {
                                            const input = document.getElementById("new-gallery-image") as HTMLInputElement;
                                            if (input.value.trim()) {
                                                updateField("gallery", [...(formData.gallery || []), input.value.trim()]);
                                                input.value = "";
                                            }
                                        }}
                                        style={{ padding: "0.75rem 1rem", backgroundColor: formData.primaryColor, color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
                                    >
                                        <ImageIcon size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Videos */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    YouTube Videos
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
                                    {formData.videos?.map((videoId, index) => (
                                        <div key={index} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                            <Video size={20} color="#ff0000" />
                                            <input
                                                type="text"
                                                placeholder="YouTube Video ID"
                                                value={videoId}
                                                onChange={e => {
                                                    const newVideos = [...(formData.videos || [])];
                                                    newVideos[index] = e.target.value;
                                                    updateField("videos", newVideos);
                                                }}
                                                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                            />
                                            <button
                                                onClick={() => updateField("videos", formData.videos?.filter((_, i) => i !== index))}
                                                style={{ padding: "0.75rem", backgroundColor: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "8px", cursor: "pointer" }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <input
                                        type="text"
                                        placeholder="YouTube Video ID (e.g., dQw4w9WgXcQ)"
                                        id="new-video"
                                        onKeyPress={e => {
                                            if (e.key === "Enter") {
                                                const input = e.target as HTMLInputElement;
                                                if (input.value.trim()) {
                                                    updateField("videos", [...(formData.videos || []), input.value.trim()]);
                                                    input.value = "";
                                                }
                                            }
                                        }}
                                        style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                    />
                                    <button
                                        onClick={() => {
                                            const input = document.getElementById("new-video") as HTMLInputElement;
                                            if (input.value.trim()) {
                                                updateField("videos", [...(formData.videos || []), input.value.trim()]);
                                                input.value = "";
                                            }
                                        }}
                                        style={{ padding: "0.75rem 1rem", backgroundColor: formData.primaryColor, color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Feature Toggles */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Enable Features
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {[
                                        { key: "enableProducts", label: "Products/Services" },
                                        { key: "enableGallery", label: "Photo Gallery" },
                                        { key: "enablePayment", label: "Payment Details" },
                                        { key: "enableFeedback", label: "Feedback System" },
                                        { key: "enableContactForm", label: "Enquiry Form" },
                                        { key: "enableGreetings", label: "Festival Greetings" }
                                    ].map(({ key, label }) => (
                                        <label key={key} style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", padding: "0.75rem", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                                            <input
                                                type="checkbox"
                                                checked={formData[key as keyof BusinessCard] as boolean}
                                                onChange={e => updateField(key, e.target.checked)}
                                                style={{ width: "18px", height: "18px", cursor: "pointer" }}
                                            />
                                            <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Company Details */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Company Details
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input
                                        type="text"
                                        placeholder="Year Established"
                                        value={formData.yearOfEst}
                                        onChange={e => updateField("yearOfEst", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <textarea
                                        placeholder="Nature of Business"
                                        value={formData.natureOfBusiness}
                                        onChange={e => updateField("natureOfBusiness", e.target.value)}
                                        rows={2}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%", resize: "vertical" }}
                                    />
                                </div>
                            </div>

                            {/* Images */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Images
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input
                                        type="url"
                                        placeholder="Profile Photo URL"
                                        value={formData.profilePhoto}
                                        onChange={e => updateField("profilePhoto", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="url"
                                        placeholder="Company Logo URL"
                                        value={formData.companyLogo}
                                        onChange={e => updateField("companyLogo", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="url"
                                        placeholder="Cover Image URL"
                                        value={formData.coverImage}
                                        onChange={e => updateField("coverImage", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                </div>
                            </div>

                            {/* Theme Colors */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Theme Colors
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <div>
                                        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#6b7280", marginBottom: "0.5rem", display: "block" }}>
                                            Primary Color
                                        </label>
                                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                                            <input
                                                type="color"
                                                value={formData.primaryColor}
                                                onChange={e => updateField("primaryColor", e.target.value)}
                                                style={{ width: "60px", height: "45px", borderRadius: "8px", border: "1px solid #e5e7eb", cursor: "pointer" }}
                                            />
                                            <input
                                                type="text"
                                                value={formData.primaryColor}
                                                onChange={e => updateField("primaryColor", e.target.value)}
                                                placeholder="#6366f1"
                                                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontFamily: "monospace" }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#6b7280", marginBottom: "0.5rem", display: "block" }}>
                                            Secondary Color
                                        </label>
                                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                                            <input
                                                type="color"
                                                value={formData.secondaryColor}
                                                onChange={e => updateField("secondaryColor", e.target.value)}
                                                style={{ width: "60px", height: "45px", borderRadius: "8px", border: "1px solid #e5e7eb", cursor: "pointer" }}
                                            />
                                            <input
                                                type="text"
                                                value={formData.secondaryColor}
                                                onChange={e => updateField("secondaryColor", e.target.value)}
                                                placeholder="#0f172a"
                                                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", fontFamily: "monospace" }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "0.5rem", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                                        <div style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.75rem", fontWeight: "600" }}>Quick Presets:</div>
                                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                            {[
                                                { name: "Blue", primary: "#6366f1", secondary: "#0f172a" },
                                                { name: "Purple", primary: "#9333ea", secondary: "#581c87" },
                                                { name: "Green", primary: "#10b981", secondary: "#065f46" },
                                                { name: "Orange", primary: "#f97316", secondary: "#9a3412" },
                                                { name: "Pink", primary: "#ec4899", secondary: "#831843" },
                                                { name: "Teal", primary: "#14b8a6", secondary: "#134e4a" }
                                            ].map(preset => (
                                                <button
                                                    key={preset.name}
                                                    onClick={() => {
                                                        updateField("primaryColor", preset.primary);
                                                        updateField("secondaryColor", preset.secondary);
                                                    }}
                                                    style={{
                                                        padding: "0.5rem 1rem",
                                                        backgroundColor: preset.primary,
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "6px",
                                                        fontSize: "0.75rem",
                                                        fontWeight: "600",
                                                        cursor: "pointer",
                                                        boxShadow: `0 2px 8px ${preset.primary}40`
                                                    }}
                                                >
                                                    {preset.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subdomain */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Your Card URL *
                                </h3>
                                <div style={{ display: "flex", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
                                    <input
                                        type="text"
                                        placeholder="your-name"
                                        value={formData.subdomain}
                                        onChange={e => updateField("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                        style={{ flex: 1, padding: "0.75rem", border: "none" }}
                                    />
                                    <div style={{ padding: "0.75rem 1rem", backgroundColor: "#f3f4f6", fontSize: "0.85rem", color: "#6b7280", fontWeight: "600" }}>
                                        .lvh.me
                                    </div>
                                </div>
                            </div>

                            {/* Publish Button */}
                            <button
                                onClick={handlePublish}
                                disabled={isPublishing}
                                style={{
                                    width: "100%",
                                    padding: "1rem",
                                    backgroundColor: formData.primaryColor,
                                    color: "white",
                                    border: "none",
                                    borderRadius: "12px",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                    cursor: isPublishing ? "not-allowed" : "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.5rem"
                                }}
                            >
                                {isPublishing ? <><Loader2 size={20} className="spin" /> Publishing...</> : <><Share2 size={20} /> Publish Card</>}
                            </button>

                            {publishedUrl && (
                                <div style={{ padding: "1rem", backgroundColor: "#f0fdf4", border: "1px solid #22c55e", borderRadius: "8px", textAlign: "center" }}>
                                    <CheckCircle2 size={24} color="#22c55e" style={{ margin: "0 auto 0.5rem" }} />
                                    <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Card Published!</p>
                                    <a href={publishedUrl} target="_blank" style={{ color: "#22c55e", fontSize: "0.85rem" }}>{publishedUrl}</a>
                                </div>
                            )}

                            {error && (
                                <div style={{ padding: "1rem", backgroundColor: "#fee2e2", border: "1px solid #ef4444", borderRadius: "8px" }}>
                                    <p style={{ color: "#ef4444", fontSize: "0.85rem" }}>{error}</p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* GREETING TAB */}
                    {activeTab === "greeting" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            <div style={{ padding: "1.5rem", backgroundColor: "#fef3c7", border: "1px solid #fbbf24", borderRadius: "12px", textAlign: "center" }}>
                                <Sparkles size={32} color="#f59e0b" style={{ margin: "0 auto 0.5rem" }} />
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#92400e", marginBottom: "0.5rem" }}>
                                    Festival Greetings Feature
                                </h3>
                                <p style={{ color: "#78350f", fontSize: "0.9rem" }}>
                                    Coming Soon! Automatically send beautiful greetings on festivals and special occasions to your customers.
                                </p>
                            </div>
                            
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Enable Greetings
                                </h3>
                                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb", cursor: "pointer" }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.enableGreetings}
                                        onChange={e => updateField("enableGreetings", e.target.checked)}
                                        style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: "600", color: "#1f2937" }}>Festival Greetings</div>
                                        <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Show greeting section on your card</div>
                                    </div>
                                </label>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Upcoming Festivals
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {[
                                        { name: "Diwali 2026", date: "Oct 23, 2026", color: "#f59e0b" },
                                        { name: "New Year 2027", date: "Jan 1, 2027", color: "#6366f1" },
                                        { name: "Christmas 2026", date: "Dec 25, 2026", color: "#ef4444" },
                                        { name: "Holi 2026", date: "Mar 14, 2026", color: "#ec4899" },
                                        { name: "Eid 2026", date: "Apr 21, 2026", color: "#10b981" }
                                    ].map(festival => (
                                        <div
                                            key={festival.name}
                                            style={{
                                                padding: "1rem",
                                                backgroundColor: "#fff",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: "8px",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>{festival.name}</div>
                                                <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>{festival.date}</div>
                                            </div>
                                            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: festival.color }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* SETTINGS TAB */}
                    {activeTab === "settings" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            <div style={{ padding: "1.5rem", backgroundColor: "#ede9fe", border: "1px solid #a78bfa", borderRadius: "12px", textAlign: "center" }}>
                                <SettingsIcon size={32} color="#7c3aed" style={{ margin: "0 auto 0.5rem" }} />
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#5b21b6", marginBottom: "0.5rem" }}>
                                    Advanced Settings
                                </h3>
                                <p style={{ color: "#6d28d9", fontSize: "0.9rem" }}>
                                    Manage your branding, company details, and business settings.
                                </p>
                            </div>
                            
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Company Details
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input
                                        type="text"
                                        placeholder="Year of Establishment"
                                        value={formData.yearOfEst}
                                        onChange={e => updateField("yearOfEst", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nature of Business"
                                        value={formData.natureOfBusiness}
                                        onChange={e => updateField("natureOfBusiness", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Business Hours (e.g., Mon-Sat: 9 AM - 6 PM)"
                                        value={formData.hours}
                                        onChange={e => updateField("hours", e.target.value)}
                                        style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Branding
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <div>
                                        <label style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem", display: "block" }}>Company Logo URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com/logo.png"
                                            value={formData.companyLogo}
                                            onChange={e => updateField("companyLogo", e.target.value)}
                                            style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem", display: "block" }}>Profile Photo URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com/profile.jpg"
                                            value={formData.profilePhoto}
                                            onChange={e => updateField("profilePhoto", e.target.value)}
                                            style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem", display: "block" }}>Cover Image URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com/cover.jpg"
                                            value={formData.coverImage}
                                            onChange={e => updateField("coverImage", e.target.value)}
                                            style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem", color: "#1f2937" }}>
                                    Feature Toggles
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {[
                                        { key: "enableContactForm", label: "Contact Form", icon: Mail },
                                        { key: "enableFeedback", label: "Feedback Section", icon: Star },
                                        { key: "enableGallery", label: "Gallery", icon: ImageIcon },
                                        { key: "enableProducts", label: "Products/Services", icon: Briefcase },
                                        { key: "enablePayment", label: "Payment Details", icon: CreditCard }
                                    ].map(({ key, label, icon: Icon }) => (
                                        <label
                                            key={key}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.75rem",
                                                padding: "1rem",
                                                backgroundColor: "#f9fafb",
                                                borderRadius: "8px",
                                                border: "1px solid #e5e7eb",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={(formData as any)[key]}
                                                onChange={e => updateField(key, e.target.checked)}
                                                style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                            />
                                            <Icon size={18} color="#6b7280" />
                                            <div style={{ flex: 1, fontWeight: "600", color: "#1f2937" }}>{label}</div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Preview Panel */}
            <div style={{ flex: 1, backgroundColor: "#f8f9fa", display: "flex", flexDirection: "column" }}>
                {/* Preview Header */}
                <div style={{ height: "60px", backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                    <div style={{ display: "flex", backgroundColor: "#f3f4f6", padding: "0.25rem", borderRadius: "8px" }}>
                        <button
                            onClick={() => setViewMode("desktop")}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: viewMode === "desktop" ? "#fff" : "transparent",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "0.85rem",
                                fontWeight: "600"
                            }}
                        >
                            <Monitor size={16} /> Desktop
                        </button>
                        <button
                            onClick={() => setViewMode("mobile")}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: viewMode === "mobile" ? "#fff" : "transparent",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "0.85rem",
                                fontWeight: "600"
                            }}
                        >
                            <Smartphone size={16} /> Mobile
                        </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6b7280", fontSize: "0.85rem" }}>
                        <Eye size={16} /> Live Preview
                    </div>
                </div>

                {/* Preview Content */}
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "start", padding: "2rem", overflow: "auto" }}>
                    <motion.div
                        animate={{ width: viewMode === "mobile" ? "375px" : "100%" }}
                        transition={{ duration: 0.3 }}
                        style={{
                            height: "fit-content",
                            maxHeight: "100%",
                            backgroundColor: "#fff",
                            borderRadius: viewMode === "mobile" ? "40px" : "12px",
                            border: viewMode === "mobile" ? "12px solid #000" : "1px solid #e5e7eb",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                            overflow: "auto"
                        }}
                    >
                        {formData.name ? (() => {
                            const selectedTemplate = CARD_TEMPLATES.find(t => t.id === formData.templateId);
                            const TemplateComponent = selectedTemplate?.component || ModernCard;
                            return (
                                <TemplateComponent 
                                    card={formData as BusinessCard} 
                                    isMobile={viewMode === "mobile"}
                                />
                            );
                        })() : (
                            <div style={{ padding: "4rem 2rem", textAlign: "center", color: "#9ca3af" }}>
                                <p>Start filling the form to see live preview</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
}
