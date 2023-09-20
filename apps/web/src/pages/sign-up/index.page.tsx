import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Group,
  Title,
  Text,
  Checkbox,
  SimpleGrid,
} from '@mantine/core';

import config from 'config';
import { RoutePath } from 'routes';
import { handleError } from 'utils';
import { Link } from 'components';

import { accountApi, accountConstants } from 'resources/account';
import { IconCircleCheck } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const schema = z.object({
  email: z
    .string()
    .regex(accountConstants.emailRegex, 'Email format is incorrect.'),
  password: z
    .string()
    .regex(
      accountConstants.passwordRegex,
      'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).',
    ),
});

type SignUpParams = z.infer<typeof schema>;

const passwordRules = [
  {
    title: 'Be 6-50 characters',
    done: false,
  },
  {
    title: 'Have at least one letter',
    done: false,
  },
  {
    title: 'Have at least one number',
    done: false,
  },
];

const SignUp: NextPage = () => {
  const [email] = useState('');
  const [registered] = useState(false);
  const [signupToken] = useState();

  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch('password', '');

  const router = useRouter();

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 6 && passwordValue.length <= 50;
    updatedPasswordRulesData[1].done = /[a-zA-Z]/.test(passwordValue);
    updatedPasswordRulesData[2].done = /\d/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isLoading: isSignUpLoading } = accountApi.useSignUp<SignUpParams>();

  const onSubmit = (data: SignUpParams) => signUp(data, {
    onSuccess: () => {
      router.reload();
    },
    onError: (e) => handleError(e, setError),
  });

  if (registered) {
    return (
      <>
        <Head>
          <title>Sign up</title>
        </Head>
        <Stack sx={{ width: '450px' }}>
          <Title order={2}>Thanks!</Title>
          <Text size="md" sx={({ colors }) => ({ color: colors.gray[5] })}>
            Please follow the instructions from the email to complete a sign up
            process. We sent an email with a confirmation link to
            {' '}
            <b>{email}</b>
          </Text>
          {signupToken && (
            <div>
              You look like a cool developer.
              {' '}
              <Link
                size="sm"
                href={`${config.API_URL}/account/verify-email?token=${signupToken}`}
              >
                Verify email
              </Link>
            </div>
          )}
        </Stack>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Stack sx={{ width: '408px' }} spacing={20}>
        <Stack spacing={34}>
          <Title order={1}>Sign Up</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={20}>
              <TextInput
                {...register('email')}
                label="Email Address"
                size="md"
                placeholder="Email Address"
                error={errors.email?.message}
              />

              <PasswordInput
                {...register('password')}
                label="Password"
                size="md"
                placeholder="Enter password"
                error={errors.password?.message}
              />
              <SimpleGrid cols={1} spacing="xs" p={4}>
                {passwordRulesData.map((ruleData) => (
                  <Checkbox
                    icon={IconCircleCheck}
                    key={ruleData.title}
                    styles={{
                      label: { color: 'GrayText' },
                    }}
                    checked={ruleData.done}
                    label={ruleData.title}
                  />
                ))}
              </SimpleGrid>
            </Stack>
            <Button
              size="md"
              type="submit"
              loading={isSignUpLoading}
              fullWidth
              mt={34}
            >
              Create account
            </Button>
          </form>
        </Stack>
        <Stack spacing={34}>
          <Group
            sx={{ fontSize: '16px', justifyContent: 'center' }}
            spacing={12}
          >
            Have an account?
            <Link
              type="router"
              href={RoutePath.SignIn}
              inherit
              underline={false}
            >
              Sign In
            </Link>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUp;
