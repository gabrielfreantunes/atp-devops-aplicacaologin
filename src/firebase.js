import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2lGiUqguU-nb8EU_JAFO66S2hVUsHVls",
  authDomain: "as2-gabriel-freire.firebaseapp.com",
  projectId: "as2-gabriel-freire",
  storageBucket: "as2-gabriel-freire.firebasestorage.app",
  messagingSenderId: "195015847340",
  appId: "1:195015847340:web:eaac85c615b356e133de09"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);