import { Pizza } from '../../models/Pizza';

const baseUrl = '/api/pizzas';

export const fetchAllPizzas = async (): Promise<Pizza[]> => {
  const response = await fetch(baseUrl);
  return response.json();
};
