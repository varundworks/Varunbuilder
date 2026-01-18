// Firebase Configuration and Initialization
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzbVxa0sk6GD6PlvU1FtqDr_lXZkes9ow",
  authDomain: "reactamgbooking.firebaseapp.com",
  projectId: "reactamgbooking",
  storageBucket: "reactamgbooking.firebasestorage.app",
  messagingSenderId: "315607332477",
  appId: "1:315607332477:web:151cc0daf5725679012314",
  measurementId: "G-MM3JSFBGVZ"
};

// Initialize Firebase (only once)
let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;

if (typeof window !== 'undefined') {
  // Client-side initialization
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  // Server-side initialization
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
  storage = getStorage(app);
}

export { app, db, storage };
