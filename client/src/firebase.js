import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCs6Kf0yTVAssWT9aB9wM5N7BZdm1TXk8s',
  authDomain: 'stripe-payment-b4cdf.firebaseapp.com',
  databaseURL: 'https://stripe-payment-b4cdf-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'stripe-payment-b4cdf',
  storageBucket: 'stripe-payment-b4cdf.appspot.com',
  messagingSenderId: '160221370101',
  appId: '1:160221370101:web:b84fa6383761922f7b97bc',
  measurementId: 'G-6YXPNJ5HK0',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
