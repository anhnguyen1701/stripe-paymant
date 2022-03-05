import { stripe } from '.';
import Stripe from 'stripe';

/**
 * Creates a Stripe Checkout session with line items
 */
export async function createStripeCheckoutSession(line_items: Stripe.Checkout.SessionCreateParams.LineItem[]) {
  const url = process.env.WEBAPP_URL;

  // example line_items
  //   {
  //     "line_items": [
  //         {
  //             "name": "hat",
  //             "amount": 500,
  //             "currency": "usd",
  //             "quantity": 3
  //         }
  //     ]
  // }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/failed`,
  });

  return session;
}
