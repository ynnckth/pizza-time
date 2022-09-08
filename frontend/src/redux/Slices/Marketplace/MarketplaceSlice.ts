import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderItem } from '../../../../../generated';

export interface MarketplaceState {}

export const initialMarketplaceState: MarketplaceState = {};

export const marketplaceApi = createApi({
  reducerPath: 'marketplaceApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_ORDER_SERVICE_API_BASE_URL}/api` }),
  endpoints: (builder) => ({
    fetchAllPizzas: builder.query<OrderItem[], void>({
      query: () => '/pizzas',
    }),
  }),
});

export const { useFetchAllPizzasQuery } = marketplaceApi;
