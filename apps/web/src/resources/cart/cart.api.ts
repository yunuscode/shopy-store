import { useMutation, useQuery } from 'react-query';

import queryClient from 'query-client';
import { apiService } from 'services';

import { Cart } from 'resources/cart/cart.types';

export function useCreateCartItem<T>() {
  const createCartItem = (data: T) => apiService.post('/cart/', data);

  return useMutation<Cart, unknown, T>(createCartItem, {
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
      queryClient.invalidateQueries('cartList');
    },
  });
}

export interface CartListResponse {
  count: number;
  items: Cart[];
}

export function useCartList<T>(params: T) {
  const list = () => apiService.get('/cart', params);

  return useQuery<CartListResponse>(['cartList', params], list);
}

export function useRemoveProductFromCart(productId: string) {
  const removeProduct = () => apiService.delete(`/cart/${productId}`);

  return useMutation<Cart>(removeProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}

export function useProceedCheckout() {
  const checkout = () => apiService.post('/cart/proceedCheckout');

  return useMutation(checkout);
}
