import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCI87gyx2fxzUTeOGZJ42FY-ZMwNElgQ2g",
  authDomain: "dyno-english.firebaseapp.com",
  databaseURL: "https://dyno-english-default-rtdb.firebaseio.com",
  projectId: "dyno-english",
  storageBucket: "dyno-english.appspot.com",
  messagingSenderId: "131262971858",
  appId: "1:131262971858:web:65be12795ae6d24953520b",
  measurementId: "G-0D72F8STMG"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }