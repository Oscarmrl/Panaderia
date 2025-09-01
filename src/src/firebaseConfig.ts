// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAroZ4CCS9b_WuztRDgxwWFZXMkd30KfP8",
  authDomain: "panaderia-b9d0f.firebaseapp.com",
  projectId: "panaderia-b9d0f",
  storageBucket: "panaderia-b9d0f.firebasestorage.app",
  messagingSenderId: "1019440582259",
  appId: "1:1019440582259:web:f075c6625fcd1f85462406",
  measurementId: "G-3ZCTHJ7LTD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
