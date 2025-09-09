// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAORs9Oxu-MdRgqt-zD3eDpjyfobGp8Jl0",
  authDomain: "task-f6d72.firebaseapp.com",
  projectId: "task-f6d72",
  storageBucket: "task-f6d72.firebasestorage.app",
  messagingSenderId: "871320323335",
  appId: "1:871320323335:web:13f17f75329ae91fde71a2",
  measurementId: "G-M1Z9X3V1WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

