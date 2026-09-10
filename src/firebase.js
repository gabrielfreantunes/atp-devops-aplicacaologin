import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYWiT72DZx5O-zWNvf5OD1O7P8D-ZGN4k",
  authDomain: "as2-gabriel-freire-devops.firebaseapp.com",
  projectId: "as2-gabriel-freire-devops",
  storageBucket: "as2-gabriel-freire-devops.firebasestorage.app",
  messagingSenderId: "841403480791",
  appId: "1:841403480791:web:c5b6695c2b35f69ac9ce92"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);