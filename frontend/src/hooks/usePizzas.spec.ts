import usePizzas from './usePizzas';
import * as PizzaApi from '../api/Pizza/PizzaApi';
import { waitFor, renderHook } from '@testing-library/react';
import { OrderItem } from '../../../generated';

jest.mock('../api/Pizza/PizzaApi');

describe('usePizzas', () => {
  it('should return pizzas with loading state false and undefined error state', async () => {
    const testPizza: OrderItem = { name: 'Hawaii', description: 'Test pizza', unitPrice: 5, available: true };
    jest.spyOn(PizzaApi, 'fetchAllPizzas').mockImplementation(() => Promise.resolve([testPizza] as OrderItem[]));

    const { result } = renderHook<
      { pizzas: OrderItem[]; loadingPizzas: boolean; errorLoadingPizzas: string | undefined },
      { pizzas: OrderItem[]; loadingPizzas: boolean; errorLoadingPizzas: string | undefined }
    >(() => usePizzas());

    await waitFor(() => expect(result.current.pizzas).toContainEqual(testPizza));
    await waitFor(() => expect(result.current.loadingPizzas).toBe(false));
    await waitFor(() => expect(result.current.errorLoadingPizzas).toBeUndefined());
  });

  it('should return error message, empty pizzas and loading false', async () => {
    const errorMessage = 'Something went wrong';
    jest.spyOn(PizzaApi, 'fetchAllPizzas').mockImplementation(() => Promise.reject({ message: errorMessage }));

    const { result } = renderHook<
      { pizzas: OrderItem[]; loadingPizzas: boolean; errorLoadingPizzas: string | undefined },
      { pizzas: OrderItem[]; loadingPizzas: boolean; errorLoadingPizzas: string | undefined }
    >(() => usePizzas());

    await waitFor(() => expect(result.current.errorLoadingPizzas).toBe(errorMessage));
    await waitFor(() => expect(result.current.pizzas.length).toBe(0));
    await waitFor(() => expect(result.current.loadingPizzas).toBe(false));
  });
});
