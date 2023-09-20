import { Grid, Pagination, SimpleGrid, Stack } from '@mantine/core';
import Head from 'next/head';
import { useListProducts } from 'resources/product/product.api';
import { useState } from 'react';
import { Product } from 'resources/product/product.types';
import { useDebouncedValue } from '@mantine/hooks';
import ProductCard from './components/ProductCard';
import { AllFilters, RangeFilters as Filters } from './components/Filters';
import { FilterParams } from './home.types';

const defaultValue: FilterParams = {
  page: 1,
  sort: {
    createdOn: 'desc',
  },
};

const Home = () => {
  const [filters, setFilters] = useState<FilterParams>(defaultValue);

  const [debounced] = useDebouncedValue(filters, 200);

  const { data: products, isLoading } = useListProducts<FilterParams>(debounced);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Grid columns={14}>
        <Grid.Col span={3}>
          <Filters filters={filters} setFilters={setFilters} />
        </Grid.Col>
        <Grid.Col span="auto">
          <Stack spacing={3}>
            <AllFilters
              filters={filters}
              setFilters={setFilters}
              count={products?.count}
            />
            <SimpleGrid mt={10} cols={3}>
              {products?.items.map((item: Product) => (
                <ProductCard key={item._id} item={item} />
              ))}
              {isLoading
                && new Array(6)
                  .fill(1)
                  .map((i) => <ProductCard key={i} isLoading={isLoading} />)}
            </SimpleGrid>
            <Pagination
              mt="md"
              mb="lg"
              total={products?.totalPages || 0}
              onChange={(e) => setFilters({ ...filters, page: e })}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Home;
