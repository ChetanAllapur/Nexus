import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration from environment variables (Vite).
// Create a .env.local file with your Firebase config to run locally.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

// Check if config is present
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId;

let app;
let db;
let auth;
let googleProvider;

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    
    // Analytics may fail in some environments
    try {
      getAnalytics(app);
    } catch (e) {
      console.warn("Firebase Analytics initialization skipped:", e.message);
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    app = null;
  }
} else {
  console.warn("Firebase config missing. Create .env.local with VITE_FIREBASE_* keys.");
  app = null;
}

export { app, db, auth, googleProvider };
export default app;
