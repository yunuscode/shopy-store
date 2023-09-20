import { Button, Flex, Image, Text, Title } from '@mantine/core';
import Link from 'next/link';

const EmptyScreenCart = () => (
  <Flex justify="center" direction="column" align="center">
    <Image
      src="./images/balloon.png"
      width={160}
      height={160}
      alt="Baloon image"
    />
    <Title size="h3" mt="md">
      {'Oops, there\'s nothing here yet!'}
    </Title>
    <Text w="25%" align="center" mt="md" color="gray">
      {`You haven't made any purchases yet. Go to the marketplace and make
        purchases.`}
    </Text>
    <Link href="/" type="router">
      <Button size="sm" mt="md">
        Go to marketplace
      </Button>
    </Link>
  </Flex>
);

export default EmptyScreenCart;
