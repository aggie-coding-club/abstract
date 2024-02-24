// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVuXBq1AHJSvMkFPHY9GyDK1W40wWF1qo",
  authDomain: "abstract-6386a.firebaseapp.com",
  projectId: "abstract-6386a",
  storageBucket: "abstract-6386a.appspot.com",
  messagingSenderId: "794480743891",
  appId: "1:794480743891:web:dd20d0aa1d80b91e404b26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
