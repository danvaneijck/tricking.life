// src/services/authService.ts
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

export const signUpWithEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const passwordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

export const logout = () => {
    return signOut(auth);
};

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};
