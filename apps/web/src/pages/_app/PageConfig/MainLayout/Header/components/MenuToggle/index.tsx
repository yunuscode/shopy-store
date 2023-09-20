import { forwardRef, memo } from 'react';
import { Avatar, UnstyledButton, useMantineTheme } from '@mantine/core';

import { accountApi } from 'resources/account';

const MenuToggle = forwardRef<HTMLButtonElement>((props, ref) => {
  const { primaryColor } = useMantineTheme();

  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <UnstyledButton ref={ref} {...props}>
      <Avatar color={primaryColor} radius="xl">
        US
      </Avatar>
    </UnstyledButton>
  );
});

export default memo(MenuToggle);
