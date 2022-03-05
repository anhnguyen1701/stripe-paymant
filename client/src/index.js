import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

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
