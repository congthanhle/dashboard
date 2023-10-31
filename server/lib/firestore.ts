import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { database, refStorage, storage } from "~/server/lib/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const queryByCollection = async (col: string) => {
  const colRef = collection(database, col);
  const snapshot = await getDocs(colRef);
  const docs = Array.from(snapshot.docs).map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  return docs;
};
export const query = (col: string, callback: (docs: any) => void) => {
  const colRef = collection(database, col);
  const unsubscribe = onSnapshot(colRef, (snapshot) => {
    const docs = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    callback(docs);
  });

  return unsubscribe;
};

export const queryById = async (col: string, id: string) => {
  const colRef = collection(database, col);
  const docRef = doc(colRef, id);
  const docSnap = await getDoc(docRef);
  return { id, ...docSnap.data() };
};

export const addItem = async (col: string, document: Object, id: string) => {
  const colRef = collection(database, col);
  const docRef = id ? await setDoc(doc(colRef, id), document) : await addDoc(colRef, document);
  return docRef;
};

export const editItem = async (col: string, id: string, document: any) => {
  const colRef = collection(database, col);
  const docRef = await updateDoc(doc(colRef, id), document);
  return { state: "success" };
};

export const deleteItem = async (col: string, id: string) => {
  const colRef = collection(database, col);
  const docRef = await deleteDoc(doc(colRef, id));
  return { state: "success" };
};

export const uploadFileImage = async (file: File, path: string, id: string) => {
  return new Promise((resolve, reject) => {
    
    const metadata = {
      cacheControl: "public,max-age=300",
      contentType: "image",
    };
    
    const imageFile = { url: "" };
    const pathImg = path + "/" + id + Date.now();
    const storageRef = refStorage(storage, pathImg);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imageFile.url = downloadURL;
          resolve(imageFile.url); 
        });
      }
    );
  });
};

