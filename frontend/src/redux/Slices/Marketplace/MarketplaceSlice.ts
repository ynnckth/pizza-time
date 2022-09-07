import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderItem } from '../../../../../generated';

export interface MarketplaceState {}

export const initialMarketplaceState: MarketplaceState = {};

export const marketplaceApi = createApi({
  reducerPath: 'marketplaceApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    fetchAllPizzas: builder.query<OrderItem[], void>({
      query: () => '/pizzas',
    }),
  }),
});

export const { useFetchAllPizzasQuery } = marketplaceApi;
