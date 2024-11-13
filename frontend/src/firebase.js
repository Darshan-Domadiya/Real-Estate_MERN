// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a4726.firebaseapp.com",
  // authDomain: "https://mern-auth-7.onrender.com",
  projectId: "mern-auth-a4726",
  storageBucket: "mern-auth-a4726.appspot.com",
  messagingSenderId: "993580409163",
  appId: "1:993580409163:web:47ce1c5912d2b583c208ce",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
