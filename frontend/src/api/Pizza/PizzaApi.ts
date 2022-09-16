import { OrderItem } from '../../../generated';

export const pizzasBaseUrl = `${process.env.REACT_APP_ORDER_SERVICE_API_BASE_URL}/api/pizzas`;

/**
 * @deprecated Prefer using RTK Query to fetch pizzas instead of this custom hook (see MarketplaceSlice.ts)
 */
export const fetchAllPizzas = async (): Promise<OrderItem[]> => {
  const response = await fetch(pizzasBaseUrl);
  return response.json();
};
