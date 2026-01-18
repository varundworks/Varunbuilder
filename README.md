# MikiVcard - Digital Business Card & Festival Greeting Platform

A **mobile-first**, **WhatsApp-optimized** SaaS platform for creating digital business cards and sharing personalized festival greetings with customers and contacts.

## 🎯 Platform Overview

MikiVcard is designed for **small and medium businesses** in India and similar markets where WhatsApp is the primary communication channel. It combines:

1. **Digital Business Cards** - Professional, shareable vCards
2. **Festival Greetings** - Automated festival wishes with business branding
3. **WhatsApp-First** - Optimized for instant sharing on WhatsApp

### Key Principle: Template-Driven, Not a Builder
Unlike website builders, MikiVcard uses **fixed templates** that users customize through **simple forms**. No drag-and-drop, no complexity—just fill in details and publish.

---

## 🚀 Features

### Digital Business Cards
- **One card per user** - Simple, focused approach
- **5 Professional Templates** - Modern, Minimal, Professional, Colorful, Elegant
- **Mobile-optimized** - Perfect viewing on smartphones
- **vCard Download** - Save to phone contacts
- **WhatsApp Integration** - Share card instantly via WhatsApp
- **Social Links** - Connect all social profiles
- **Services Showcase** - List expertise and offerings
- **Business Hours** - Display availability

### Festival Greetings
- **Pre-loaded Festivals** - Diwali, Holi, Eid, Christmas, New Year, etc.
- **Branded Greetings** - Your business info included
- **Customizable Messages** - Edit greetings before sharing
- **WhatsApp Ready** - One-click sharing
- **Upcoming Reminders** - See festivals coming up

### Multi-Tenancy
- **Unique Subdomains** - Each user gets `yourname.mikivcard.com`
- **Edge Routing** - Fast, global delivery via Vercel Edge
- **Professional URLs** - Easy to share and remember

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: Next.js Middleware (Edge Runtime)
- **Database**: In-memory (ready for Supabase/MongoDB)

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the application**:
   - Card Builder: [http://localhost:3000](http://localhost:3000)
   - Demo Card: [http://demo.lvh.me:3000](http://demo.lvh.me:3000)
   - Greetings: [http://demo.lvh.me:3000/greetings](http://demo.lvh.me:3000/greetings)

*Note: `lvh.me` is a free service that resolves all subdomains to `127.0.0.1` (localhost).*

---

## 📱 User Journey

### Creating a Card (5-Step Form)

1. **Choose Template** - Select from 5 design options
2. **Basic Info** - Name, title, company, tagline, bio
3. **Contact Details** - Phone, email, WhatsApp, website, location
4. **Social & Services** - Connect social profiles, list services
5. **Customize & Publish** - Pick colors, set subdomain, go live

### Sharing the Card

1. User publishes card at `rajesh.mikivcard.com`
2. Opens card on mobile
3. Clicks "Share on WhatsApp"
4. Sends to contacts/groups
5. Recipients see professional card, can save contact

### Festival Greetings

1. User navigates to `/greetings` on their card
2. Sees today's festival (if any) highlighted
3. Views upcoming festivals (next 30 days)
4. Customizes greeting message (optional)
5. Clicks "Share on WhatsApp"
6. Greeting includes their business card details

---

## 🌐 Production Deployment (Vercel)

### Wildcard Subdomain Setup

1. **Deploy to Vercel**: Connect your GitHub repo
2. **Add Domains**:
   - Root: `mikivcard.com`
   - Wildcard: `*.mikivcard.com`
3. **Environment Variables**:
   - `NEXT_PUBLIC_ROOT_DOMAIN=mikivcard.com`

### Database Integration

Replace in-memory store with **Supabase** or **MongoDB**:

1. Create tables: `business_cards`, `festival_greetings`, `user_greetings`
2. Update functions in `src/lib/db.ts`
3. All functions are already async-ready

---

## 📊 Database Schema

### Business Cards Table
```typescript
{
  id: string (UUID)
  subdomain: string (unique)
  templateId: string
  name: string
  title: string
  company: string
  phone: string
  email: string
  // ... other fields
  enableGreetings: boolean
  status: "DRAFT" | "PUBLISHED"
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Festival Greetings Table
```typescript
{
  id: string
  name: string (e.g., "Diwali")
  date: date
  category: "festival" | "religious" | "national"
  defaultMessage: text
  templateIds: string[]
  isActive: boolean
}
```

---

## 🎨 Templates

### Business Card Templates
1. **Modern** - Gradient backgrounds, bold colors
2. **Minimal** - Clean, simple, professional
3. **Professional** - Corporate, business-focused
4. **Colorful** - Vibrant, creative designs
5. **Elegant** - Sophisticated, premium feel

All templates include:
- Profile photo section
- Contact action buttons
- Social media links
- Services/expertise list
- vCard download
- WhatsApp share

---

## 🎯 Target Market

### Primary Users
- **Small Business Owners** - Shops, salons, consultants
- **Freelancers** - Designers, photographers, writers
- **Service Providers** - Electricians, plumbers, contractors
- **Sales Professionals** - Insurance, real estate agents
- **Local Businesses** - Restaurants, boutiques, clinics

### Why It Works
- **WhatsApp Dominance** - 500M+ users in India
- **Festival Culture** - 20+ major festivals annually
- **Mobile-First** - Smartphone penetration growing
- **Cost-Effective** - Cheaper than printed cards
- **Always Updated** - Change details anytime

---

## 🚧 Roadmap

### Phase 1 (Current)
- ✅ Business card creation
- ✅ 5 templates
- ✅ WhatsApp sharing
- ✅ Festival greetings system
- ✅ Multi-tenancy routing

### Phase 2 (Next)
- [ ] User authentication
- [ ] Dashboard for editing cards
- [ ] Analytics (views, shares)
- [ ] Custom domain support
- [ ] Image upload (Cloudinary/S3)
- [ ] QR code generation
- [ ] Lead capture forms

### Phase 3 (Future)
- [ ] Admin panel for managing festivals
- [ ] Template marketplace
- [ ] Bulk WhatsApp sending
- [ ] Payment integration
- [ ] Mobile app (React Native)

---

## 💡 Business Model

### Freemium SaaS
- **Free Tier**: Basic card, 3 greetings/month
- **Pro Tier** ($5/month): Custom templates, unlimited greetings, analytics
- **Business Tier** ($15/month): Team cards, white-label, API access

---

## 📞 Support

For issues or questions, contact: support@mikivcard.com

---

## 📄 License

Proprietary - All Rights Reserved

---

**Built with ❤️ for Small Businesses**
