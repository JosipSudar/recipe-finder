import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsKQKhWqCIU1bVb3mXfU90GeQBk5Ubezg",
  authDomain: "recipe-finder-5acdd.firebaseapp.com",
  projectId: "recipe-finder-5acdd",
  storageBucket: "recipe-finder-5acdd.appspot.com",
  messagingSenderId: "782384672071",
  appId: "1:782384672071:web:f0c4c91d00e6850b38f062",
  measurementId: "G-CJ7PHW8WZP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
