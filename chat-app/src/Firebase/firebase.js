import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCGrEhXx1yPjHXwwS9c6aqx4IAi6Jfgmts",
    authDomain: "gupshup-a058d.firebaseapp.com",
    projectId: "gupshup-a058d",
    storageBucket: "gupshup-a058d.firebasestorage.app",
    messagingSenderId: "666026331211",
    appId: "1:666026331211:web:c471dff8244d80a57551ce"
  };

  const app = initializeApp(firebaseConfig);
  const auth=getAuth(app);
  const db=getFirestore(app);

  export {auth,db};
  