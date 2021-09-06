// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7dyGgAQC3u9pHkii-ea_lkL13lzpq7Zk",
  authDomain: "note-app-c264c.firebaseapp.com",
  projectId: "note-app-c264c",
  storageBucket: "note-app-c264c.appspot.com",
  messagingSenderId: "928904880126",
  appId: "1:928904880126:web:0c5443fd39942f1783eaaf",
  measurementId: "G-JXNBZ3RLVH",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;
