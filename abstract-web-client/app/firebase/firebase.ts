import { initializeApp } from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import "firebase/firestore";
import { getDoc, getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, query, where, getDocs, } from "firebase/firestore"; 

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

export async function addUser(isNew:boolean, gUser: { [email:string]:any}){ //i'm not familiar with typescript, so this is the only way i could get an object as a parameter without it giving me an error lol
        //if the user is authenticated (and not null)
        if(isNew && gUser!=null){
            //get number of users in the user document
            const userBase = collection(db,"users");
            const userQuery = query(userBase);
            const totalUsers = (await getDocs(userQuery)).size;
            //add the user to the cloud firestore
              await setDoc(doc(db, "users", `user${totalUsers}`), {
                email: gUser.email,
                photoUrl: gUser.photoURL,
                uid: gUser.uid,
              });
        }
        else{
            //if the user is not newly authenticated (already has an account)
            //don't make a new document
            console.log("Account already exists in database!");
        }    
}

//THESE ARE REDUNTANT, JUST FOR TESTING
export async function getEmail(userEmail:string){
    const userBase = collection(db,"users");
    const emailDocs = query(userBase,where("email","==",userEmail));
    const email = (await getDocs(emailDocs)).docs[0].data().email;
    return email;
}

export async function getPhotoUrl(photoURL:string){
    const userBase = collection(db,"users");
    const photoDocs = query(userBase,where("photoUrl","==",photoURL));
    const pURL = (await getDocs(photoDocs)).docs[0].data().photoUrl;
    return pURL;
}
//retrives the uid for an inputted 
export async function getUid(Uid:string){
    const userBase = collection(db,"users");
    const uidDocs = query(userBase,where("uid","==",Uid));
    const uid = (await getDocs(uidDocs)).docs[0].data().uid;
    return uid;
}



