
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAEYN92fHZC7V9h2a5tCYxHKp3WIKMpYgI",
  authDomain: "anucivil-f8553.firebaseapp.com",
  projectId: "anucivil-f8553",
  storageBucket: "anucivil-f8553.appspot.com",
  messagingSenderId: "312987966801",
  appId: "1:312987966801:web:f98645b3432e18fd9c0770",
  measurementId: "G-W9YH5QNJD3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};

