import config from 'config';
import Stripe from 'stripe';

const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: '2023-08-16',
  typescript: true,
});

export default stripe;
