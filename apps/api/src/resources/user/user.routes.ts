import { routeUtil } from 'utils';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
