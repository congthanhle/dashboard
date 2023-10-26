import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { auth } from "~/server/lib/firebase";
import store from "~/store";

export default function () {
  const registerUser = async (payload: any): Promise<boolean> => {
    const { email, password, username, avatar, timestamp } = payload;
    try {
      const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
      if (userCredential) {
        const user = userCredential.user;
        const userData = {
          id: user.uid,
          username,
          email,
          avatar:
            "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1032.jpg",
          timestamp: new Date().getTime(),
        };
        store.dispatch("ADD_USER", userData);
        return true;
      }
    } catch (error: any) {
      return false;
    }
    return false;
  };
  const logInUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        const user = userCredential.user;
        const userData = {
          id: user.uid,
        };
        await store.dispatch("GET_USER", userData);
        return true;
      }
    } catch (error: any) {
      return false;
    }
    return false;
  };
  const signOutUser = async (): Promise<boolean> => {
    try {
      await signOut(auth);
      return true;
    } catch (error: any) {
      return false;
    }
  };

  return {
    logInUser,
    registerUser,
    signOutUser
  };
}
