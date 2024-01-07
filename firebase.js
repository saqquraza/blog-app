// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCGbSiWSYH3MtCzlUUncyxqmjj89_5fm4",
  authDomain: "nextblog-2b750.firebaseapp.com",
  projectId: "nextblog-2b750",
  storageBucket: "nextblog-2b750.appspot.com",
  messagingSenderId: "1029248936203",
  appId: "1:1029248936203:web:470383cd17c90932949a0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, db, auth };