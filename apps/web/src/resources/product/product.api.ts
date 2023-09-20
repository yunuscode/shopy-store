import { useMutation, useQuery } from 'react-query';

import queryClient from 'query-client';
import { apiService } from 'services';

import { Product } from 'resources/product/product.types';

export function useCreateProduct<T>() {
  const createProduct = (data: T) => apiService.post('/products/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return useMutation<Product, unknown, T>(createProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['products'], data);
    },
  });
}

export function useListProducts<T>(params: T) {
  const list = () => apiService.get('/products', params);

  interface ProductListResponse {
    count: number;
    items: Product[];
    totalPages: number;
  }

  return useQuery<ProductListResponse>(['products', params], list);
}

export function useRemoveProduct(productId: string) {
  const removeProduct = () => apiService.delete(`/products/${productId}`);

  return useMutation<Product>(removeProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['products'], data);
    },
  });
}
