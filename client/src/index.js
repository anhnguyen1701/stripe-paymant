import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@strupe/stripe-js';

//public key
export const stripePromise = loadStripe('pk_test_51KZrPPA5I9jxi9MCBTzCNMp8Aatv27LfVae08MBadACUdgTZYLTUA3F79ZWek9FHG6xukd1rjezbtZ2MqBxVuKIX00URXhuuGD');

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}> 
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
