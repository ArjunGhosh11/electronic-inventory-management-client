// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChyNOehM1arYMqfXwucOOnAgWRQgaCkKA",
    authDomain: "project-cse370-380ea.firebaseapp.com",
    projectId: "project-cse370-380ea",
    storageBucket: "project-cse370-380ea.appspot.com",
    messagingSenderId: "119343407417",
    appId: "1:119343407417:web:163914a7178ea51e6c48e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;