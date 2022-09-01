import { fireEvent, screen } from '@testing-library/react';
import Marketplace from './Marketplace';
import * as usePizzas from '../../hooks/usePizzas';
import { TestId } from '../../testUtils/TestId';
import { pizzaMargherita, pizzaSalami } from '../../testUtils/TestPizzas';
import { renderWithProviders } from '../../testUtils/renderWithProviders';

jest.mock('../../hooks/usePizzas');

describe('Marketplace', () => {
  it('should show loading spinner while retrieving pizzas', () => {
    jest
      .spyOn(usePizzas, 'default')
      .mockImplementation(() => ({ pizzas: [], loadingPizzas: true, errorLoadingPizzas: undefined }));

    renderWithProviders(<Marketplace />);

    expect(screen.getByTestId(TestId.LOADING_SPINNER)).toBeVisible();
    expect(screen.queryByTestId(TestId.MARKETPLACE_PIZZA_CARD)).toBeFalsy();
  });

  it('should list available pizzas', () => {
    jest.spyOn(usePizzas, 'default').mockImplementation(() => ({
      pizzas: [pizzaMargherita, pizzaSalami],
      loadingPizzas: false,
      errorLoadingPizzas: undefined,
    }));

    renderWithProviders(<Marketplace />);

    expect(screen.queryAllByTestId(TestId.MARKETPLACE_PIZZA_CARD)).toHaveLength(2);
    expect(screen.queryByText(pizzaMargherita.name)).toBeVisible();
    expect(screen.queryByText(pizzaSalami.name)).toBeVisible();
    expect(screen.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS)).toHaveTextContent('0');
    expect(screen.queryByTestId(TestId.LOADING_SPINNER)).toBeFalsy();
  });

  it('should update displayed items in cart', () => {
    jest.spyOn(usePizzas, 'default').mockImplementation(() => ({
      pizzas: [pizzaMargherita],
      loadingPizzas: false,
      errorLoadingPizzas: undefined,
    }));
    renderWithProviders(<Marketplace />);

    fireEvent.click(screen.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART));
    fireEvent.click(screen.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART));
    fireEvent.click(screen.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART));

    expect(screen.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS)).toHaveTextContent('3');
  });
});
