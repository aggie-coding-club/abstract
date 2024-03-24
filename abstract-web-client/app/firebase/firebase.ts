import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

//Initialize Firestore Database
export const db = getFirestore(app);

// will take in a filename, and id
export async function addImage(fileName: string, fileID: string) {
    if(!auth.currentUser){
        console.log("You Must Be Logged In To Upload an Image To The Database!") //CHANGE LATER
        return
    }
    //const docInfo = await getDoc(doc(db, "images", auth.currentUser.uid));    
    await setDoc(doc(db, "images", fileID), {
            filename: fileName,
            id: fileID,
            status: "Processed",
            title: "placeholder",
        });

}