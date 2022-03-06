import { stripe } from './';
import Stripe from 'stripe';

/**
 * Business logic for specific webhook event types
 */
const webhookHandlers = {
  'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
    // Add your business logic here
  },
  'payment_intent.payment_failed': async (data: Stripe.PaymentIntent) => {
    // Add your business logic here
  },
};

//validate stripe webhook secret, then call handler for the event type
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET);

  try {
    await webhookHandlers[event.type](event.data.object);
    res.send({ received: true });
  } catch (error) {
    console.error(error);
    res.status(400).send(`Webhook Error: ${error}`);
  }
};
