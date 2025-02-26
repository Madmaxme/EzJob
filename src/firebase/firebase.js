// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDf8ZrqdyGFrchADMT8Qw56Rv9J6QOop7w",
  authDomain: "ezjob-704ff.firebaseapp.com",
  projectId: "ezjob-704ff",
  storageBucket: "ezjob-704ff.firebasestorage.app",
  messagingSenderId: "628633082396",
  appId: "1:628633082396:web:318d0554fa5c85676cddd9",
  measurementId: "G-3N43Y0KT8K"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

const analytics = getAnalytics(app);

export { auth };