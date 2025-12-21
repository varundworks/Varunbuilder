# Multi-Tenant Website Builder Demo

This is a SaaS-style website builder built with **Next.js (App Router)** and **Vercel Middleware**.

## 🚀 Features

- **Multi-tenancy**: Dynamically serves different content based on the request subdomain.
- **Interactive Builder**: Real-time "What You See Is What You Get" (WYSIWYG) editor with live preview.
- **Dynamic Templates**: Choose from several distinct professional templates (Modern, Minimal, Professional, Playful, Dark).
- **Edge Routing**: Powered by Next.js Middleware for zero-latency domain rewriting.
- **In-Memory Store**: A mock database setup designed to be easily replaced by Supabase or MongoDB.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Vanilla CSS (no dependencies)
- **Routing**: Next.js Middleware (Edge Runtime)
- **Persistence**: In-memory mock DB

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
   - Primary App: [http://localhost:3000](http://localhost:3000)
   - Tenant Demo 1: [http://site1.lvh.me:3000](http://site1.lvh.me:3000)
   - Tenant Demo 2: [http://site2.lvh.me:3000](http://site2.lvh.me:3000)

*Note: `lvh.me` is a free service that resolves all subdomains to `127.0.0.1` (localhost).*

## 🌐 Deployment on Vercel

### Wildcard Subdomains
Vercel supports multi-tenancy beautifully through **Wildcard Domains**.

1. **Deploy to Vercel**: Connect your repo to Vercel.
2. **Setup Domains**:
   - Go to **Settings > Domains**.
   - Add your root domain (e.g., `mysaas.com`).
   - Add a wildcard domain (e.g., `*.mysaas.com`).
3. **Configure Environment Variables**:
   - Set `NEXT_PUBLIC_ROOT_DOMAIN` to your main domain (e.g., `mysaas.com`).

Once configured, any subdomain your users visit (e.g., `brand.mysaas.com`) will be intercepted by the `middleware.ts`, which extracts the "brand" segment and rewrites the request internally to `/[domain]`.

### Production Persistence
For a production app, replace the logic in `src/lib/db.ts` with a real database like **Supabase**, **Prisma**, or **MongoDB**. The current functions are already async and designed for this transition.
