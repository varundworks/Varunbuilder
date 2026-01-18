# Testing & Managing Subdomains

## Problem: "Subdomain Already Taken" Error

When you try to publish with a subdomain that already exists in Firebase, you'll get this error.

## Solution 1: Delete Test Cards from Firebase (Recommended for Testing)

### Steps:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **reactamgbooking**
3. Click **Firestore Database** in left menu
4. Navigate to **business_cards** collection
5. Find your test card (e.g., "test" or "john-doe")
6. Click the **3 dots** → **Delete document**
7. Now you can republish with that subdomain

**Quick Link:** https://console.firebase.google.com/project/reactamgbooking/firestore

## Solution 2: Use Different Test Names

Add variations to your subdomain:
```
test → test1, test2, test3
john → john-2026, john-jan, john-final
demo → demo-v1, demo-v2, demo-new
mycard → mycard-18jan, mycard-test
```

## Solution 3: View All Published Cards

To see which subdomains are taken:

1. Open Firebase Console
2. Go to Firestore Database
3. Open **business_cards** collection
4. You'll see all document IDs (these are the subdomains)

## Testing Workflow

### For Development (Multiple Tests):
```
1. Use numbered subdomains: test1, test2, test3, etc.
2. Or delete old test cards from Firebase after each test
3. Or add timestamps: john-1430, john-1445
```

### For Production (Real Cards):
```
1. Use meaningful names: company-name, person-name
2. Keep these cards (don't delete)
3. These stay accessible forever
```

## Local Testing URLs

When you publish with subdomain `mycard`:
- Local: `http://mycard.lvh.me:3000`
- After Vercel deploy: `http://mycard.yourdomain.com`

## Common Test Subdomains

Try these if others are taken:
- `test-[your-name]`
- `demo-[number]`
- `sample-[date]`
- `trial-[random-letters]`
- `temp-[your-initials]`

## Firebase Console Quick Actions

### Delete Multiple Test Cards:
1. Go to Firestore → business_cards
2. Select multiple documents (checkboxes)
3. Click delete icon
4. Confirm deletion

### View Card Data:
1. Click on any document ID
2. See all the data stored
3. Can manually edit fields if needed

## Pro Tip: Check Before Publishing

Add this to your workflow:
1. Think of a subdomain
2. Try to visit it: `http://subdomain.lvh.me:3000`
3. If it loads a card → subdomain is taken
4. If you see 404 → subdomain is available
5. Now publish with that subdomain

---

**Remember:** Once deployed to production, real customer cards should NOT be deleted. Only delete test cards during development!
