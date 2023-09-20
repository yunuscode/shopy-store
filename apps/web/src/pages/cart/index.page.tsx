import {
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Tabs,
  TabsValue,
  Text,
  Title,
} from '@mantine/core';
import Head from 'next/head';
import { useState } from 'react';
import { useCartList, useProceedCheckout } from 'resources/cart/cart.api';
import { useRouter } from 'next/router';
import CardTab from './components/Cart';
import HistoryTab from './components/History';
import EmptyScreenCart from './components/Empty';

const Products = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabsValue>('cart');
  const { data, refetch, isLoading } = useCartList({
    type: activeTab === 'cart' ? 'active' : 'history',
  });

  const { mutate: proceedCheckout, isLoading: isCheckoutLoading } = useProceedCheckout();

  const emptyState = activeTab === 'cart' && !data?.count && !isLoading;

  const handleCheckout = () => {
    proceedCheckout(undefined, {
      onSuccess: (d) => {
        if (d.url) {
          router.push(d.url);
        }
      },
    });
  };

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Grid columns={12} align="start">
        <Grid.Col span={emptyState ? 12 : 8}>
          <Tabs
            variant="unstyled"
            styles={{ tab: { paddingLeft: 0, paddingTop: 0, marginRight: 20 } }}
            defaultValue={activeTab}
            onTabChange={(tabValue) => setActiveTab(tabValue)}
          >
            <Tabs.List>
              <Tabs.Tab value="cart">
                <Title
                  size="h4"
                  color={activeTab === 'history' ? 'gray' : 'black'}
                >
                  My Cart
                </Title>
              </Tabs.Tab>
              <Tabs.Tab value="history">
                <Title
                  size="h4"
                  color={activeTab !== 'history' ? 'gray' : 'black'}
                >
                  History
                </Title>
              </Tabs.Tab>
            </Tabs.List>

            {data?.count !== 0 && <CardTab data={data} refetch={refetch} />}

            <HistoryTab data={data} />
          </Tabs>
        </Grid.Col>
        <Grid.Col
          span={emptyState ? 0 : 3}
          offset={emptyState ? 0 : 1}
          mt={emptyState ? 100 : 0}
        >
          {emptyState && <EmptyScreenCart />}

          {!emptyState && activeTab !== 'history' && (
            <Card padding="lg" radius="md" withBorder>
              <Text size="md" weight="bolder">
                Summary
              </Text>
              <Divider my="lg" />
              <Group position="apart">
                <Text color="gray">Total price:</Text>
                <Text weight="bold">
                  $
                  {data?.items.reduce((a, b) => a + b.productPrice, 0)}
                </Text>
              </Group>
              <Button
                onClick={handleCheckout}
                loading={isCheckoutLoading}
                mt={30}
                fullWidth
                radius="md"
                color="blue"
              >
                Checkout
              </Button>
            </Card>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Products;
