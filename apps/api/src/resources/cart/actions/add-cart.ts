import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { AppKoaContext, Next, AppRouter } from 'types';
import { Cart } from '../cart.types';
import { productService } from 'resources/product';
import cartService from '../cart.service';

const schema = z.object({
  productId: z.string(),
});

interface ValidatedData extends z.infer<typeof schema> {
  cart: Cart;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productId } = ctx.validatedData;

  const isProductExist = await productService.exists({ _id: productId });

  const isProductExistInCart = await cartService.exists({
    productId,
    productStatus: 'active',
  });

  ctx.assertClientError(isProductExist, {
    product: "Product doesn't exist",
  });

  ctx.assertClientError(!isProductExistInCart, {
    cart: 'Product is already in cart',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { productId } = ctx.validatedData;
  const { user } = ctx.state;

  const product = await productService.findOne({
    _id: productId,
  });

  const cartItem = await cartService.insertOne({
    productId: productId,
    userId: user._id,
    productImageUrl: product.productImageUrl,
    productName: product.productName,
    productPrice: product.price,
    productStatus: 'active',
  });

  ctx.body = cartItem;
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), validator, handler);
};
