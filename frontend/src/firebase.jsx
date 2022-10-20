// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL78bwOxTujHQyVfLug8EEJz2S3V4dTOM",
  authDomain: "dbe-system.firebaseapp.com",
  projectId: "dbe-system",
  storageBucket: "dbe-system.appspot.com",
  messagingSenderId: "283774430566",
  appId: "1:283774430566:web:550ae98453e23f4d4faca7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app)

