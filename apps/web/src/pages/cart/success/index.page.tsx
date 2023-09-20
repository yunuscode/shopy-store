import { Button, Flex, Image, Text, Title } from '@mantine/core';
import Link from 'next/link';

const SuccessPage = () => (
  <Flex justify="center" direction="column" align="center">
    <Image src="/images/popper.png" width={50} height={50} alt="Baloon image" />
    <Title size="h3" mt="md">
      Payment Successfull
    </Title>
    <Text w="25%" align="center" mt="md" color="gray">
      Hooray, you have completed your payment!
    </Text>
    <Link href="/cart" type="router">
      <Button size="sm" mt="md">
        Back to Cart
      </Button>
    </Link>
  </Flex>
);

export default SuccessPage;
