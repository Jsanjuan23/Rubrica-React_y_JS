import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDoueSPpJzf7tYlZe0tJhriWsHMZ_IQr4A",
    authDomain: "bd-salud-7c5f8.firebaseapp.com",
    projectId: "bd-salud-7c5f8",
    storageBucket: "bd-salud-7c5f8.appspot.com",
    messagingSenderId: "522087985853",
    appId: "1:522087985853:web:865fd0657bf99ed45ebdd4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export{firebase}