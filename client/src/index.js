import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FirebaseAppProvider } from 'reactfire';

//public key
export const stripePromise = loadStripe('pk_test_51KZrP PA5I9jxi9MCBTzCNMp8Aatv27LfVae08MBadACUdgTZYLTUA3F79ZWek9FHG6xukd1rjezbtZ2MqBxVuKIX00URXhuuGD');

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

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
