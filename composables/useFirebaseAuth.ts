import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "~/server/lib/firebase";

export default function () {
  const registerUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        const user = userCredential.user;
        return true;
      }
    } catch (error: any) {
      return false;
    }
    return false;
  };
  return {
    registerUser,
  };
}
