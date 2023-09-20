import { routeUtil } from 'utils';

import get from './actions/get';
import signUp from './actions/sign-up';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import shadowLogin from './actions/shadow-login';

const publicRoutes = routeUtil.getRoutes([signUp, signIn, signOut]);

const privateRoutes = routeUtil.getRoutes([get]);

const adminRoutes = routeUtil.getRoutes([shadowLogin]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
