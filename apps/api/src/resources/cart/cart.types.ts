import { z } from 'zod';

import schema from './cart.schema';

export type Cart = z.infer<typeof schema>;
