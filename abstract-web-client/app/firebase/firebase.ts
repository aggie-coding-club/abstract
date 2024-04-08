import { initializeApp } from "firebase/app";
import {User, getAuth } from "firebase/auth";
import { collection,getFirestore, getDoc,getDocs, setDoc, doc, query } from "firebase/firestore";
import { escape } from "querystring";

//root directory for processed images
const bucketProcessedRootDir = "https://storage.googleapis.com/abstract-processed-image-bucket/"

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

//get Images from a certain user id
export async function getImages(user: User) {
    const { uid } = user;
    var imageLinks:string[] = []
    console.log("current user: ", uid)
    const imagesDocSnapShot = await getDocs(collection(db,"images"));
    imagesDocSnapShot.forEach((doc)=>{
        const docData = doc.data();
        const userID = docData.user?.uid;
        if(userID===uid){
            if(docData.filename){
            const fullImageLink = bucketProcessedRootDir.concat(docData.filename)
            //console.log(fullImageLink)
            imageLinks.push(fullImageLink);
            }
        }
        else{
            console.log("no user id")
        }
    })
    if(imageLinks.length>0){
        console.log("yes exists")
    return imageLinks;
    }else{
        return undefined;
    }

}