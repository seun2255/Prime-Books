// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGHjAQTfFksPeFYTR4FsqHmpRu1qakxoE",
  authDomain: "prime-books-c6690.firebaseapp.com",
  projectId: "prime-books-c6690",
  storageBucket: "prime-books-c6690.appspot.com",
  messagingSenderId: "966869938386",
  appId: "1:966869938386:web:209617a9511bc4ce903d0b",
  measurementId: "G-ZDZVD6JZ4K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
