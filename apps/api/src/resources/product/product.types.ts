import { z } from 'zod';

import schema from './product.schema';

export type Product = z.infer<typeof schema>;
