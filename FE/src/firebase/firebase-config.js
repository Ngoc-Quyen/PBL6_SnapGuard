import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCTnaIa40gXfNv5oGHIectLxdTheaKcPQQ',
    authDomain: 'pbl6-snap-guard.firebaseapp.com',
    projectId: 'pbl6-snap-guard',
    storageBucket: 'pbl6-snap-guard.appspot.com',
    messagingSenderId: '812095612897',
    appId: '1:812095612897:web:69373155ca885dde9dd4a0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
