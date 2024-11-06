// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ22FLSCAENyrRbOcLqLrw1xRy2M_R7nM",
  authDomain: "auth-development-eab13.firebaseapp.com",
  projectId: "auth-development-eab13",
  storageBucket: "auth-development-eab13.appspot.com",
  messagingSenderId: "640529812444",
  appId: "1:640529812444:web:40d19a365c4bb87096dd19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const FIREBASE_DB = getFirestore(app);