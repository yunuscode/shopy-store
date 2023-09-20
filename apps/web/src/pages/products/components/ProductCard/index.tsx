import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useRemoveProduct } from 'resources/product/product.api';
import { Product } from 'resources/product/product.types';
import DeleteIcon from '../icons/delete';

const ProductCard = ({
  item,
  refetch,
}: {
  item: Product;
  refetch: Function;
}) => {
  const {
    mutate: removeProduct,
    isLoading,
    isSuccess,
  } = useRemoveProduct(item._id);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const handleRemoveProduct = () => {
    removeProduct();
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section pos="relative">
        <Image
          src={item.productImageUrl}
          height={160}
          alt={`${item.productName}'s photo`}
        />
        <Button
          top={10}
          right={10}
          pos="absolute"
          variant="light"
          color="blue"
          size="sm"
          radius="md"
          onClick={() => handleRemoveProduct()}
          loading={isLoading}
        >
          <DeleteIcon />
        </Button>
        <Badge
          bottom={10}
          right={10}
          pos="absolute"
          color="pink"
          variant="light"
        >
          On Sale
        </Badge>
      </Card.Section>

      <Text weight="bold" mt="md" size="lg">
        {item.productName}
      </Text>

      <Group position="apart">
        <Text color="gray">Price</Text>
        <Text weight="bolder">
          $
          {item.price}
        </Text>
      </Group>
    </Card>
  );
};

export default ProductCard;
