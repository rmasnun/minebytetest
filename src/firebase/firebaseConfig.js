// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8quudbsebuqwzBnr7gsQc6x9wOIDpzxw",
  authDomain: "minebyte-16438.firebaseapp.com",
  projectId: "minebyte-16438",
  storageBucket: "minebyte-16438.firebasestorage.app",
  messagingSenderId: "572660599247",
  appId: "1:572660599247:web:7a41f1929cd0766d6e2aba",
  measurementId: "G-C3XD68XYHB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc };
