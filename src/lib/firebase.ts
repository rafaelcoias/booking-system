import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "clinica-reservas.firebaseapp.com",
  projectId: "clinica-reservas",
  storageBucket: "clinica-reservas.firebasestorage.app",
  messagingSenderId: "223248551412",
  appId: "1:223248551412:web:3233d888a8ec2e8afe7da1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);