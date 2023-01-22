// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZsOy9AJmhPU_Rc1rQID7JvY8ykDZQvRM",
  authDomain: "klugjob-by-stirner.firebaseapp.com",
  projectId: "klugjob-by-stirner",
  storageBucket: "klugjob-by-stirner.appspot.com",
  messagingSenderId: "785533425086",
  appId: "1:785533425086:web:59bb0a42e049dc2640d5ef",
  measurementId: "G-T29GK0EXC5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getFirestore(app)
export const storage = getStorage(app)