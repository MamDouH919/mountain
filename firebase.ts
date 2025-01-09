// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoHISJ_8mngPpO0vEVINayCH-0M-xLc4U",
    authDomain: "arab-test.firebaseapp.com",
    projectId: "arab-test",
    storageBucket: "arab-test.appspot.com",
    messagingSenderId: "448957608747",
    appId: "1:448957608747:web:bfe03c1ce72909e29b8b6e",
    measurementId: "G-6KP1H0XV6R"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);