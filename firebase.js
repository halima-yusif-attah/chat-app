import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, serverTimestamp  } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "chat-app-697be.firebaseapp.com",
  projectId: "chat-app-697be",
  storageBucket: "chat-app-697be.firebasestorage.app",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: "1:939476714720:web:3da773fdf1d96f3610fc85"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { db, auth, provider, signInWithPopup, serverTimestamp  };