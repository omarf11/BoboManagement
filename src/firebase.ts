import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
    authDomain: "boboplanner-8a0a3.firebaseapp.com",
    projectId: "boboplanner-8a0a3",
    storageBucket: "boboplanner-8a0a3.appspot.com",
    messagingSenderId: "759426096408",
    appId: "1:759426096408:web:81932d9d84b5d2b774926d",
    measurementId: "G-NGR7GJJMGZ"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

