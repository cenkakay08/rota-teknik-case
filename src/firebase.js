import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyAUDDlywLQS_306UGyJoiP1CQ4JQorDe3A",
  authDomain: "rota-teknik-case.firebaseapp.com",
  projectId: "rota-teknik-case",
  storageBucket: "rota-teknik-case.appspot.com",
  messagingSenderId: "315338158705",
  appId: "1:315338158705:web:26324a1b218784131d21d0",
};
// Initialize Firebase
const fire = firebase.initializeApp(config);

export default fire;
