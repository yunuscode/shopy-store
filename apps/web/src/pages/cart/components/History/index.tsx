import { Table, Tabs, Image, Group, Text } from '@mantine/core';
import { CartListResponse } from 'resources/cart/cart.api';
import { useStyles } from './styles';

const HistoryTab = ({ data }: { data?: CartListResponse }) => {
  const styles = useStyles();

  const rows = data?.items.map((element) => (
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
        {element.updatedOn && new Date(element.updatedOn).toLocaleDateString()}
      </td>
    </tr>
  ));

  return (
    <Tabs.Panel value="history" pt="xs">
      <Table variant="unstyled">
        <thead>
          <tr>
            <th className={styles.classes.tableHeads}>Item</th>
            <th className={styles.classes.tableHeads}>Unit Price</th>
            <th className={styles.classes.tableHeads}>Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Tabs.Panel>
  );
};

export default HistoryTab;
