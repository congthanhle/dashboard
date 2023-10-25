import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLzc3acpvjQGvOII_J4y7IA4CvNbrr8sU",
  authDomain: "dashboard-403fb.firebaseapp.com",
  projectId: "dashboard-403fb",
  storageBucket: "dashboard-403fb.appspot.com",
  messagingSenderId: "78075699960",
  appId: "1:78075699960:web:65422283cbab67a6c8510d",
  measurementId: "G-XHNK4KJFHJ"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
export { database, auth };
