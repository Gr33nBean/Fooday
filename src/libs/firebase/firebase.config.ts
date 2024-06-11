import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "foodayionic2024.firebaseapp.com",
  projectId: "foodayionic2024",
  storageBucket: "foodayionic2024.appspot.com",
  messagingSenderId: "1074344701530",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-3WZNZZPRT7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
