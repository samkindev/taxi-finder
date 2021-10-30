import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYCN3ZZyWoylIGWhwCAFu6-WZipwrjWaY",
    authDomain: "taxi-finder-b3cfe.firebaseapp.com",
    projectId: "taxi-finder-b3cfe",
    storageBucket: "taxi-finder-b3cfe.appspot.com",
    messagingSenderId: "675131282225",
    appId: "1:675131282225:web:22af3749b816cbcc719610",
    measurementId: "G-X2MD3QKPED"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const createdAt = serverTimestamp;

const firebase = {
    db,
    auth,
    createdAt
};

export default firebase;