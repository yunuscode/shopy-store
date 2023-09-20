import { AppKoaContext, AppRouter } from 'types';
import cartService from '../cart.service';
import config from 'config';
import { Cart } from '../cart.types';
import stripe from 'services/stripe';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const cartItems = await cartService.find({
    userId: user._id,
    productStatus: 'active',
  });

  const lineItems = cartItems.results.map((item: Cart) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.productName,
      },
      unit_amount: item.productPrice * 10,
    },
    quantity: 1,
  }));

  const checkout = await stripe.checkout.sessions.create({
    success_url: config.WEB_URL + '/cart/success',
    cancel_url: config.WEB_URL + '/cart/failed',
    mode: 'payment',

    line_items: lineItems,
  });

  await cartService.updateMany(
    {
      userId: user._id,
    },
    () => ({
      cartStripeId: checkout.id,
    }),
  );

  ctx.body = {
    url: checkout.url,
  };
}

export default (router: AppRouter) => {
  router.post('/proceedCheckout', handler);
};
