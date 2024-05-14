
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDUvFi3FD3Fs0MSfuoB6N9pr-0V8koHsho",
  authDomain: "social-media-13723.firebaseapp.com",
  projectId: "social-media-13723",
  storageBucket: "social-media-13723.appspot.com",
  messagingSenderId: "859706830363",
  appId: "1:859706830363:web:bdb04d904f4e7ab2f6d2be",
  measurementId: "G-NDLPF3GRRY"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};