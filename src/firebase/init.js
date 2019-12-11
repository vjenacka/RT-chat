import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAMJU15JJqvx1ncpdrXd6ziC_Q2VsW5Hnw",
  authDomain: "my-chat-ed674.firebaseapp.com",
  databaseURL: "https://my-chat-ed674.firebaseio.com",
  projectId: "my-chat-ed674",
  storageBucket: "my-chat-ed674.appspot.com",
  messagingSenderId: "18042524146",
  appId: "1:18042524146:web:ed1feec649d359ed9b1b6b"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
