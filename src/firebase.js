import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC1IjoHFXr7AnCYbu6Hif11Gugk3SekkGM",
    authDomain: "bd-salud-e1850.firebaseapp.com",
    projectId: "bd-salud-e1850",
    storageBucket: "bd-salud-e1850.appspot.com",
    messagingSenderId: "636056342676",
    appId: "1:636056342676:web:e0d1f4f884ad0e9f462481"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export{firebase}