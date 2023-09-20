import { AppKoaContext, AppRouter, Next } from 'types';
import cartService from '../cart.service';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(
  ctx: AppKoaContext<ValidatedData, Request>,
  next: Next,
) {
  const isProductExist = await cartService.exists({
    _id: ctx.request.params.id,
  });

  ctx.assertError(isProductExist, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  await cartService.deleteSoft({ _id: ctx.request.params.id });

  ctx.body = {};
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
