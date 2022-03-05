// env variables (stripe api key)
import { config } from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  config();
}

import Stripe from 'stripe';

// init stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2020-08-27',
});

//start the api with express
import { app } from './api';
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`app listen on http://localhost:${port}`));

