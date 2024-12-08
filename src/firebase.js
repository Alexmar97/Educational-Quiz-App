import { initializeApp } from "firebase/app";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSDbna1BMXM7THY5snVRE-GIDfeNmwH-4",
  authDomain: "eduquiz-89c97.firebaseapp.com",
  projectId: "eduquiz-89c97",
  storageBucket: "eduquiz-89c97.firebasestorage.app",
  messagingSenderId: "535926968024",
  appId: "1:535926968024:web:cd58ea968a54a215d551ad",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyBSDbna1BMXM7THY5snVRE-GIDfeNmwH-4",
//     authDomain: "eduquiz-89c97.firebaseapp.com",
//     projectId: "eduquiz-89c97",
//     storageBucket: "eduquiz-89c97.firebasestorage.app",
//     messagingSenderId: "535926968024",
//     appId: "1:535926968024:web:cd58ea968a54a215d551ad"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
