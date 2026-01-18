# Quick Test Guide

## 🧪 Testing Subdomain Routing

### Step 1: Publish a New Card

1. Go to: **http://localhost:3000/home**
2. Fill the form with:
   - Name: Test Card
   - Phone: +91 1234567890
   - Email: test@example.com
   - Subdomain: **testcard789**
3. Click "Publish Card"
4. Copy the link (should be: `http://testcard789.lvh.me:3000`)

### Step 2: Visit the Published Link

1. **Click the link or paste in new tab:** `http://testcard789.lvh.me:3000`
2. **Watch your terminal** where `npm run dev` is running
3. **Look for these logs:**

```
[Middleware] Request: testcard789.lvh.me:3000/
[Middleware] ✅ Detected subdomain: "testcard789", rewriting / to /testcard789/
[DB] Fetching card for subdomain: testcard789
[DB] Card found for testcard789: Test Card
GET /testcard789 200 in XXXms
```

### Step 3: What Should Happen

**✅ SUCCESS:**
- Browser shows your card with your data
- URL stays as `http://testcard789.lvh.me:3000`
- Terminal shows subdomain detected
- Card renders correctly

**❌ FAILURE (what you're experiencing now):**
- Browser redirects to `http://testcard789.lvh.me:3000/home`
- Shows template selection page
- Terminal might show `GET /home 200`
- Middleware not detecting subdomain

---

## 🔍 Debugging

### Check Terminal Logs

After visiting `http://testcard789.lvh.me:3000`, you should see:

```bash
[Middleware] Request: testcard789.lvh.me:3000/
[Middleware] ✅ Detected subdomain: "testcard789"
[DB] Fetching card for subdomain: testcard789
[DB] Card found for testcard789: Test Card
```

### If You See This Instead:

```bash
[Middleware] Request: localhost:3000/
[Middleware] No subdomain detected
GET /home 200
```

**Problem:** Your browser is not using the subdomain properly.

**Solutions:**
1. Make sure you're NOT using `http://localhost:3000/testcard789`
2. Use the EXACT URL: `http://testcard789.lvh.me:3000`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private mode
5. Try a different browser

---

## 📱 Test URLs

### ✅ Correct Format:
- `http://testcard789.lvh.me:3000`
- `http://mycard.lvh.me:3000`
- `http://john-doe.lvh.me:3000`

### ❌ Wrong Format:
- `http://localhost:3000/testcard789` (path, not subdomain)
- `http://testcard789.localhost:3000` (localhost doesn't support subdomains)
- `http://127.0.0.1:3000/testcard789` (IP address, no subdomains)

---

## 🆘 Still Not Working?

### Run This Test:

1. Open terminal and run:
```bash
curl -H "Host: testcard789.lvh.me:3000" http://localhost:3000/
```

2. Look for HTML containing your card data (not the home page)

3. Check the server logs in your `npm run dev` terminal

### Check DNS Resolution:

```bash
ping testcard789.lvh.me
```

Should resolve to `127.0.0.1` (your local machine).

If it doesn't work:
- `lvh.me` might be blocked
- Try adding to `/etc/hosts` (macOS/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
  ```
  127.0.0.1 testcard789.lvh.me
  127.0.0.1 mytest456.lvh.me
  ```

---

## 💡 What's Happening Behind the Scenes

1. **You visit:** `http://testcard789.lvh.me:3000`
2. **DNS resolves to:** `127.0.0.1` (localhost)
3. **Browser sends request with Host header:** `testcard789.lvh.me:3000`
4. **Middleware reads Host header**
5. **Middleware extracts subdomain:** `testcard789`
6. **Middleware rewrites:** `/` → `/testcard789/`
7. **Next.js routes to:** `src/app/[domain]/page.tsx`
8. **Page fetches from Firebase:** Card with subdomain = testcard789
9. **Card renders with selected template**

If ANY of these steps fail, you get redirected to `/home`.

---

## ✅ After Fixing

Your cards will:
- Load instantly from subdomain links
- Work permanently (data in Firebase)
- Show correct template
- Track view counts
- Never redirect to home page

**Now test it! Visit http://mytest456.lvh.me:3000 and check the terminal logs! 🚀**
