import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVD-IlsRH6jwn32QenbgPilTM3MlJaF5A",
  authDomain: "wp-headless-react.firebaseapp.com",
  projectId: "wp-headless-react",
  storageBucket: "wp-headless-react.appspot.com",
  messagingSenderId: "826351685396",
  appId: "1:826351685396:web:9b16748335c8f2296cfc01"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(firebaseApp);

setPersistence(auth, browserLocalPersistence);