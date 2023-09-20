import { Button, Flex, Image, Text, Title } from '@mantine/core';
import Link from 'next/link';

const FailedPaymentPage = () => (
  <Flex justify="center" direction="column" align="center">
    <Image
      src="/images/crossmark.png"
      width={50}
      height={50}
      alt="Crossmark image"
    />
    <Title size="h3" mt="md">
      Payment Failed
    </Title>
    <Text w="25%" align="center" mt="md" color="gray">
      Sorry, your payment failed. Would you like to try again?
    </Text>
    <Link href="/cart" type="router">
      <Button size="sm" mt="md">
        Back to Cart
      </Button>
    </Link>
  </Flex>
);

export default FailedPaymentPage;
