import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsDyv6_IEwSb7iU1Z9kWcTDNlkuEC1VUQ",
  authDomain: "react-links-fa758.firebaseapp.com",
  projectId: "react-links-fa758",
  storageBucket: "react-links-fa758.appspot.com",
  messagingSenderId: "893451047605",
  appId: "1:893451047605:web:e69307533611d667dc64fc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export{ auth, db }