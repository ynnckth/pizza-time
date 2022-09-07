import { OrderItem } from '../../../../codegen/generated';

export const pizzasBaseUrl = '/api/pizzas';

/**
 * @deprecated Prefer using RTK Query to fetch pizzas instead of this custom hook (see MarketplaceSlice.ts)
 */
export const fetchAllPizzas = async (): Promise<OrderItem[]> => {
  const response = await fetch(pizzasBaseUrl);
  return response.json();
};
