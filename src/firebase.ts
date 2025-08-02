
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAlHGYkQLvSeMLNpCDFjKSQtZz2rBCSkbU",
  authDomain: "sonsdecena.firebaseapp.com",
  projectId: "sonsdecena",
  storageBucket: "sonsdecena.firebasestorage.app",
  messagingSenderId: "846390283575",
  appId: "1:846390283575:web:fb326489d255bb9e29deb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };  