import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDjfml8f0T57PG2nfpleJdsvA_3fv4XesE",
  authDomain: "fir-9bc5d.firebaseapp.com",
  projectId: "fir-9bc5d",
  storageBucket: "fir-9bc5d.appspot.com",
  messagingSenderId: "660165788041",
  appId: "1:660165788041:web:7a4c8ad587005368736158",
  measurementId: "G-QR7J0R0QPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);