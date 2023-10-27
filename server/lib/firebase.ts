import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

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
const auth = getAuth(app)
const database = getFirestore(app);
const db = getDatabase(app);
const storage = getStorage(app);
export { database, auth, db, storage};

