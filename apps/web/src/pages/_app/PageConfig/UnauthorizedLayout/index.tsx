import { FC, ReactElement } from 'react';

import { SimpleGrid, MediaQuery } from '@mantine/core';

import { useStyles } from './styles';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  return (
    <SimpleGrid
      cols={2}
      breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 'sm' }]}
    >
      <div className={classes.wrapper}>
        <main className={classes.content}>{children}</main>
      </div>

      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <div className={classes.imageWrapper} />
      </MediaQuery>
    </SimpleGrid>
  );
};

export default UnauthorizedLayout;
