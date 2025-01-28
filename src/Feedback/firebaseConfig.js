import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_P,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_P,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_P,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_P,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_P,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_P,
};

const app2 = initializeApp(firebaseConfig, "app2");
const firestore2 = getFirestore(app2);
export { app2, firestore2 };
