// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";
// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXx5WhNurYDop-ooeYnHWYEGkrSnJ0PP0",
    authDomain: "nextjs-bookmark-manager.firebaseapp.com",
    projectId: "nextjs-bookmark-manager",
    storageBucket: "nextjs-bookmark-manager.appspot.com",
    messagingSenderId: "312013842176",
    appId: "1:312013842176:web:cd510faf70e5e323a235e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export { app, db, auth, signOut };