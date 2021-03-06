import { createStripeCheckoutSession } from './checkout';
import { createPaymentIntent } from './payments';
import { handleStripeWebhook } from './webhooks';
import { createSetupIntent, listPaymentMethods } from './customers';
import { auth } from './firebase';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { createSubscription } from './billing';
export const app = express();

app.use(decodeJWT);
app.use(express.json());
app.use(cors({ origin: true }));

//set raw body for webhook handling
app.use(
  express.json({
    verify: (req, res, buffer) => (req['rawBody'] = buffer),
  })
);

app.post('/test', (req: Request, res: Response) => {
  const amount = req.body.amount;

  res.status(200).send({ with_tax: amount * 7 });
});

// checkout
app.post(
  '/checkouts/',
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createStripeCheckoutSession(body.line_items));
  })
);

app.post(
  '/payments',
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createPaymentIntent(body.amount));
  })
);

app.post('/hooks', runAsync(handleStripeWebhook));

// Save a card on the customer record with a SetupIntent
app.post(
  '/wallet',
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);
    const setupIntent = await createSetupIntent(user.uid);
    res.send(setupIntent);
  })
);

app.get(
  '/wallet',
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);

    const wallet = await listPaymentMethods(user.uid);
    res.send(wallet.data);
  })
);

// create a and charge new Subscription
app.post(
  '/subscriptions/',
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);
    const { plan, payment_method } = req.body;
    const subscription = await createSubscription(user.uid, plan, payment_method);
    res.send(subscription);
  })
);

function runAsync(callback: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
}

async function decodeJWT(req: Request, res: Response, next: NextFunction) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}

function validateUser(req: Request) {
  const user = req['currentUser'];
  if (!user) {
    throw new Error('you must be logged in to make this request');
  }
  return user;
}
