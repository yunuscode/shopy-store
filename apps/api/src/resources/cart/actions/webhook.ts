import { AppKoaContext, AppRouter } from 'types';
import cartService from '../cart.service';
import stripe from 'services/stripe';
import config from 'config';

interface CheckoutSession {
  id: string;
}

interface StripeEvent {
  type: string;
  data: {
    object: CheckoutSession;
  };
}

async function handler(ctx: AppKoaContext) {
  const sig = ctx.request.headers['stripe-signature'];

  if (!sig) {
    ctx.status = 400;
    ctx.body = 'Stripe signature missing';
    return;
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      ctx.request.rawBody,
      sig,
      config.STRIPE_SECRET,
    );
  } catch (error: unknown) {
    const err = error as Error;
    ctx.status = 400;
    ctx.body = `Webhook signature verification failed. ${err.message}`;
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as CheckoutSession;

      await cartService.updateMany(
        {
          cartStripeId: session.id,
        },
        () => ({
          productStatus: 'history',
          updatedOn: new Date(),
        }),
      );
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  ctx.status = 200;
  ctx.body = { received: true };
}

export default (router: AppRouter) => {
  router.post('/webhook', handler);
};
