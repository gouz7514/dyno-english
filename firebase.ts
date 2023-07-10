// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI87gyx2fxzUTeOGZJ42FY-ZMwNElgQ2g",
  authDomain: "dyno-english.firebaseapp.com",
  projectId: "dyno-english",
  storageBucket: "dyno-english.appspot.com",
  messagingSenderId: "131262971858",
  appId: "1:131262971858:web:65be12795ae6d24953520b",
  measurementId: "G-0D72F8STMG"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)