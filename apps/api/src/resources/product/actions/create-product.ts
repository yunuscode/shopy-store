import multer from '@koa/multer';

import { cloudStorageService } from 'services';
import { Next, AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import validate from 'middlewares/validate.middleware';
import { Product } from '../product.types';
import productService from '../product.service';

const upload = multer();

const schema = z.object({
  productName: z.string(),
  price: z.string().refine((arg: string) => !isNaN(parseInt(arg, 10)), {
    message: 'Price must be number',
  }),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { file } = ctx.request;
  const { productName, price } = ctx.validatedData;

  const convertedPrice = parseInt(price, 10);

  console.log(productName, price);

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  const { Location } = await cloudStorageService.uploadPublic(
    `productImages/${fileName}`,
    file,
  );

  const product = await productService.insertOne({
    productName,
    price: convertedPrice,
    productImageUrl: Location,
    userId: user._id,
  });

  ctx.body = product;
}

export default (router: AppRouter) => {
  router.post('/', upload.single('file'), validate(schema), validator, handler);
};
