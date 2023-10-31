import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { addItem } from "~/server/lib/firestore";
import { auth } from "~/server/lib/firebase";
const {addUser} = useUsers();

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
          phoneNumber: "",
          address: "",
          role: "admin"
        };
        addItem("users", userData, userData.id);
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
        return true;
      }
    } catch (error: any) {
      return false;
    }
    return false;
  };
  const signOutUser = (): boolean => {
    try {
      auth.signOut()
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return true;
    } catch (error: any) {
      return false;
    }
  };
  const deleteUser = (id: any) => {
    deleteUser(id)
  }
  return {
    logInUser,
    registerUser,
    signOutUser,
    deleteUser
  };
}
