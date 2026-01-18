# Firebase Setup Instructions

## ⚠️ IMPORTANT: You're getting "Missing or insufficient permissions" error!

This means Firebase Firestore security rules are blocking your writes. Follow these steps:

---

## Step 1: Enable Firestore Database

1. Go to: https://console.firebase.google.com/project/reactamgbooking/firestore
2. If you see "Get started" button, click it
3. Choose **Start in test mode** (for now)
4. Select **Cloud Firestore location** (closest to you, e.g., asia-south1)
5. Click "Enable"

---

## Step 2: Set Up Security Rules

### Go to Firestore Rules Tab:
1. Open: https://console.firebase.google.com/project/reactamgbooking/firestore/rules
2. Replace ALL existing rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read and write business cards (for testing)
    match /business_cards/{cardId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Allow anyone to read festivals
    match /festival_greetings/{festivalId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Allow websites
    match /websites/{websiteId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

3. Click **"Publish"** button (top right)
4. Wait for "Rules published successfully" message

---

## Step 3: Verify Collections Will Be Created

After you publish the rules:
1. Collections will be created automatically when you publish your first card
2. Go back to: https://console.firebase.google.com/project/reactamgbooking/firestore/data

You should see:
- `business_cards` (empty at first)
- `festival_greetings` (empty at first)
- `websites` (empty at first)

---

## Step 4: Test Publishing

1. Go to: http://localhost:3000/home
2. Fill in the form:
   - Name: Test User
   - Phone: +91 1234567890
   - Email: test@example.com
   - Subdomain: test123
3. Click "Publish Card"
4. Check Firebase Console - you should see a new document in `business_cards` collection!

---

## Troubleshooting

### Issue: Still getting permission errors
**Solution:** 
- Make sure you clicked "Publish" in the Rules tab
- Wait 30 seconds for rules to propagate
- Refresh your browser at localhost:3000

### Issue: Collections not appearing
**Solution:**
- They appear only AFTER you publish your first card
- Check the Data tab in Firestore Console after publishing

### Issue: "Firestore not enabled"
**Solution:**
- Go to Firestore Database in Firebase Console
- Click "Create Database"
- Choose "Start in test mode"
- Select your region
- Click "Enable"

---

## 🔒 Security Note (IMPORTANT FOR PRODUCTION!)

The rules above allow ANYONE to read/write (good for testing).

**Before deploying to production**, change the rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /business_cards/{cardId} {
      allow read: if true;  // Anyone can view cards
      allow create: if true; // Anyone can create cards (for now)
      allow update: if request.auth != null; // Only authenticated users can update
      allow delete: if request.auth != null; // Only authenticated users can delete
    }
    
    match /festival_greetings/{festivalId} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated admins
    }
  }
}
```

---

## Quick Links

- **Firestore Console**: https://console.firebase.google.com/project/reactamgbooking/firestore
- **Rules Editor**: https://console.firebase.google.com/project/reactamgbooking/firestore/rules
- **Project Settings**: https://console.firebase.google.com/project/reactamgbooking/settings/general

---

## After Setting Up Rules

Your app will:
✅ Store all published cards in Firestore permanently
✅ Generate working subdomain links
✅ Track view counts automatically
✅ Keep data even after restarting the server

Test it now! 🚀
