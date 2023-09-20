import { z } from 'zod';

import config from 'config';
import { securityUtil } from 'utils';
import { analyticsService, authService, emailService } from 'services';
import { validateMiddleware } from 'middlewares';
import { AppKoaContext, Next, AppRouter, Template } from 'types';
import { userService, User } from 'resources/user';

import { emailRegex, passwordRegex } from 'resources/account/account.constants';

const schema = z.object({
  email: z.string().regex(emailRegex, 'Email format is incorrect.'),
  password: z
    .string()
    .regex(
      passwordRegex,
      'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).',
    ),
});

interface ValidatedData extends z.infer<typeof schema> {
  user: User;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { email } = ctx.validatedData;

  const isUserExists = await userService.exists({ email });

  ctx.assertClientError(!isUserExists, {
    email: 'User with this email is already registered',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { email, password } = ctx.validatedData;

  const hash = await securityUtil.getHash(password);

  const user = await userService.insertOne({
    email,
    firstName: 'Firstname',
    lastName: 'lastnaem',
    fullName: 'Fullname',
    passwordHash: hash.toString(),
    isEmailVerified: true,
  });

  await authService.setTokens(ctx, user._id);

  ctx.body = {
    ok: true,
  };
}

export default (router: AppRouter) => {
  router.post('/sign-up', validateMiddleware(schema), validator, handler);
};
