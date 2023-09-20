import { routeUtil } from 'utils';
import addCart from './actions/add-cart';
import removeCart from './actions/remove-cart';
import list from './actions/list';
import createCheckout from './actions/create-checkout';
import webhook from './actions/webhook';

const publicRoutes = routeUtil.getRoutes([webhook]);

const privateRoutes = routeUtil.getRoutes([
  addCart,
  removeCart,
  list,
  createCheckout,
]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
