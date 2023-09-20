import { AppKoaContext, AppRouter } from 'types';
import cartService from '../cart.service';
import { z } from 'zod';
import { validateMiddleware } from 'middlewares';

const schema = z.object({
  type: z.enum(['history', 'active']).default('active'),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { type } = ctx.validatedData;

  const cartItems = await cartService.find({
    userId: user._id,
    productStatus: type,
  });

  ctx.body = {
    items: cartItems.results,
    count: cartItems.count,
  };
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
