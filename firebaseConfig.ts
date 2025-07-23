import { initializeApp, FirebaseApp } from "firebase/app";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Firebase Config
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-ABCDEF",
};

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let auth: Auth | undefined;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.warn("Firebase initialization failed:", error instanceof Error ? error.message : error);
  // For development without Firebase, we'll still export undefined values
  // Components should handle this gracefully
  app = undefined;
  db = undefined;
  storage = undefined;
  auth = undefined;
}

export { db, storage, auth };

export const initializeFirebase = (): FirebaseApp | undefined => {
  return app;
};
