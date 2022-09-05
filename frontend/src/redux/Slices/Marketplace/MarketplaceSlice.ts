import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pizza } from '../../../models/Pizza';

export interface MarketplaceState {}

export const initialMarketplaceState: MarketplaceState = {};

export const marketplaceApi = createApi({
  reducerPath: 'marketplaceApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    fetchAllPizzas: builder.query<Pizza[], void>({
      query: () => '/pizzas',
    }),
  }),
});

export const { useFetchAllPizzasQuery } = marketplaceApi;
