import { z } from 'zod';

const schema = z
  .object({
    _id: z.string(),

    productId: z.string(),
    userId: z.string(),
    productName: z.string(),
    productPrice: z.number(),
    productImageUrl: z.string(),

    productStatus: z.enum(['active', 'history']).default('active'),

    cartStripeId: z.string().optional(),

    createdOn: z.date().optional(),
    updatedOn: z.date().optional(),
    deletedOn: z.date().optional().nullable(),
  })
  .strict();

export default schema;
