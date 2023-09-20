import _ from 'lodash';

import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './cart.schema';
import { Cart } from './cart.types';

const service = db.createService<Cart>(DATABASE_DOCUMENTS.CART, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

export default Object.assign(service);
