# Vstudio Deployment Guide

## Firebase Setup (Already Done)

Your Firebase project is already configured:
- Project ID: `reactamgbooking`
- Collections used: `business_cards`, `festival_greetings`, `websites`

## Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Access the app:**
- Builder: `http://localhost:3000/home`
- Demo card: `http://demo.lvh.me:3000` (uses lvh.me for local subdomain testing)

## Deploying to Vercel

### Step 1: Set up Firebase rules (Important!)

Go to Firebase Console → Firestore Database → Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all published cards
    match /business_cards/{cardId} {
      allow read: if true;
      allow create: if true;
      allow update: if request.auth != null || true; // Change to 'request.auth != null' for authentication
    }
    
    // Allow read access to festivals
    match /festival_greetings/{festivalId} {
      allow read: if true;
      allow write: if false; // Only manage from Firebase console
    }
    
    // Legacy websites support
    match /websites/{websiteId} {
      allow read: if true;
      allow create: if true;
    }
  }
}
```

**Publish these rules in Firebase Console!**

### Step 2: Deploy to Vercel

1. **Connect your GitHub repository to Vercel**
   - Go to vercel.com
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Environment Variables** (Optional for production domain)
   Add this in Vercel dashboard:
   ```
   NEXT_PUBLIC_ROOT_DOMAIN=vstudio.com
   ```
   (Replace with your actual domain)

3. **Domain Setup for Subdomains**
   - In Vercel dashboard, go to your project settings
   - Add your root domain (e.g., `vstudio.com`)
   - Add wildcard subdomain: `*.vstudio.com`
   - Update DNS records as instructed by Vercel

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your app will be live at `yourproject.vercel.app`

### Step 3: Configure Subdomains

#### Option A: Using Vercel Domain
If using Vercel's `.vercel.app` domain:
- You can't use custom subdomains directly
- Use path-based routing instead: `yourapp.vercel.app/cards/[subdomain]`
- Update publish route to generate path-based URLs

#### Option B: Using Custom Domain (Recommended)
1. Purchase a domain (e.g., `vstudio.com`)
2. Add to Vercel project
3. Configure DNS:
   ```
   A Record: @ → 76.76.21.21
   CNAME: * → cname.vercel-dns.com
   ```
4. Published cards will work at: `subdomain.vstudio.com`

## Testing Published Cards

### Local Testing:
1. Go to `http://localhost:3000/home`
2. Fill in the form (Business Card tab)
3. Click "Publish Card"
4. You'll get a link like: `http://yourname.lvh.me:3000`
5. Click the link to see your published card

### After Vercel Deployment:
1. Published links will be: `subdomain.yourdomain.com`
2. Each card is stored permanently in Firebase Firestore
3. Cards can be viewed by anyone with the subdomain link
4. View counts are tracked automatically

## Troubleshooting

### Issue: "Published link redirects to home"
**Solution:** Ensure you're using the correct subdomain format:
- Local: `subdomain.lvh.me:3000`
- Production: `subdomain.yourdomain.com`

### Issue: "Firebase permission denied"
**Solution:** Update Firestore rules as shown in Step 1 above

### Issue: "Subdomain not working on Vercel"
**Solution:** 
1. Verify wildcard DNS is configured: `* CNAME cname.vercel-dns.com`
2. Check domain settings in Vercel dashboard
3. Wait 24-48 hours for DNS propagation

## Features

✅ **Business Cards:**
- 6 beautiful templates (Modern, Minimal, Professional, Elegant, Vibrant, Peaceful)
- Full customization (colors, content, images)
- All sections: Profile, Social Links, Products, Payment, Gallery, Videos, Feedback, Enquiry

✅ **Greeting Tab:**
- Festival greetings management
- Upcoming festivals preview
- Enable/disable greeting feature

✅ **Settings Tab:**
- Company details (year established, nature of business)
- Branding (logo, profile photo, cover image)
- Feature toggles (contact form, feedback, gallery, products, payment)

✅ **Firebase Integration:**
- Permanent storage in Firestore
- Real-time data sync
- View count tracking
- Subdomain-based routing

## Firestore Collections Structure

### business_cards
```javascript
{
  id: string,
  subdomain: string,
  templateId: string,
  name: string,
  title: string,
  company: string,
  phones: string[],
  email: string,
  // ... all other BusinessCard fields
  viewCount: number,
  createdAt: string,
  updatedAt: string,
  status: "PUBLISHED"
}
```

### festival_greetings
```javascript
{
  id: string,
  name: string,
  date: string, // YYYY-MM-DD
  category: "festival" | "seasonal" | "religious",
  defaultMessage: string,
  templateIds: string[],
  isActive: boolean
}
```

## Support

For issues or questions:
1. Check Firebase Console for errors
2. Check Vercel deployment logs
3. Verify DNS configuration for subdomain routing
4. Check browser console for client-side errors

---

🎉 **Your Vstudio app is ready for deployment!**
