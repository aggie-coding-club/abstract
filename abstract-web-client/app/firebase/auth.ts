import { User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Signs the user in with Google Popup
 * @returns A promise that resolves when the user is signed in
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
            addUser(result.user);
        })
        .catch((error) => {
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

/**
 * Registers user in Firestore if user does not exist
 * @param user - User object
 */
async function addUser(user: User) {
    const { displayName, email, photoURL, uid } = user;
    const docInfo = await getDoc(doc(db, "users", uid));
    if (docInfo != null) {
        await setDoc(doc(db, "users", uid), {
            displayName: displayName,
            email: email,
            photoUrl: photoURL,
            uid: uid,
        });
    } else {
        console.log("Account already exists in database!");
    }
}
