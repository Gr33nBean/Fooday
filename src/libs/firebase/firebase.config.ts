// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_B3GRzyrRTk7tnNhAUx073kn4FspMgqo",
  authDomain: "foodayionic2024.firebaseapp.com",
  projectId: "foodayionic2024",
  storageBucket: "foodayionic2024.appspot.com",
  messagingSenderId: "1074344701530",
  appId: "1:1074344701530:web:9e57ac7a6588cc69f1f263",
  measurementId: "G-3WZNZZPRT7",
};

// Initialize Firebase

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
