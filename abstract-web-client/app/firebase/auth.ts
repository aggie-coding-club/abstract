import { User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { error } from "console";

/**
 * Signs the user in with Google Popup
 * @returns A promise that resolves when the user is signed in
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider()).catch((error) => {
        console.log("Error: Auth Pop-up closed");
    });
}

/**
 * Signs the user out
 * @returns A promise that resolves when the user signs out
 */
export function signOut() {
    return auth.signOut();
}

/**
 * Triggers callback when when auth state is changed
 * @returns A function to unsubscribe from the listener
 */
export function onAuthStateChangedHelper(
    callback: (user: User | null) => void
) {
    return onAuthStateChanged(auth, callback);
}
