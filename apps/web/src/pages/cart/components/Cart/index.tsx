import {
  Table,
  Tabs,
  Image,
  Group,
  Text,
  UnstyledButton,
  Flex,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import {
  CartListResponse,
  useRemoveProductFromCart,
} from 'resources/cart/cart.api';
import { useEffect } from 'react';
import { Cart } from 'resources/cart/cart.types';
import { useStyles } from './styles';

const CartItem = ({
  element,
  refetch,
}: {
  element: Cart;
  refetch: Function;
}) => {
  const {
    mutate: removeFromCart,
    isLoading,
    isSuccess,
  } = useRemoveProductFromCart(element._id);

  useEffect(() => {
    refetch();
  }, [isSuccess, refetch]);

  return (
    <tr key={element.productName}>
      <td>
        <Group>
          <Image
            src={element.productImageUrl}
            width={90}
            height={90}
            radius="md"
            alt={element.productName}
          />
          <Text size="md" weight="bolder">
            {element.productName}
          </Text>
        </Group>
      </td>
      <td>
        $
        {element.productPrice}
      </td>
      <td>
        <Group>
          <UnstyledButton>-</UnstyledButton>
          <Text>1</Text>
          <UnstyledButton>+</UnstyledButton>
        </Group>
      </td>
      <td>
        <UnstyledButton onClick={() => removeFromCart()} disabled={isLoading}>
          <Flex align="center">
            <IconX color="gray" size={14} />
            <Text ml={5} size="sm">
              {isLoading ? 'Loading' : 'Remove'}
            </Text>
          </Flex>
        </UnstyledButton>
      </td>
    </tr>
  );
};

const CartTab = ({
  data,
  refetch,
}: {
  data?: CartListResponse;
  refetch: Function;
}) => {
  const styles = useStyles();

  const rows = data?.items.map((item) => (
    <CartItem key={item._id} element={item} refetch={refetch} />
  ));

  return (
    <Tabs.Panel value="cart" pt="xs">
      <Table variant="unstyled">
        <thead>
          <tr>
            <th className={styles.classes.tableHeads}>Item</th>
            <th className={styles.classes.tableHeads}>Unit Price</th>
            <th className={styles.classes.tableHeads}>Quantity</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Tabs.Panel>
  );
};

export default CartTab;
