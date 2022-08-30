import { screen } from '@testing-library/react';
import Marketplace from './Marketplace';
import * as usePizzas from '../../hooks/usePizzas';
import { TestId } from '../../testUtils/TestId';
import { pizzaMargherita, pizzaSalami } from '../../testUtils/TestPizzas';
import { render } from '../../testUtils/render';

jest.mock('../../hooks/usePizzas');

describe('Marketplace', () => {
  it('should show loading spinner while retrieving pizzas', () => {
    jest
      .spyOn(usePizzas, 'default')
      .mockImplementation(() => ({ pizzas: [], loadingPizzas: true, errorLoadingPizzas: undefined }));

    render(<Marketplace />);

    expect(screen.getByTestId(TestId.LOADING_SPINNER)).toBeVisible();
    expect(screen.queryByTestId(TestId.MARKETPLACE_PIZZA_CARD)).toBeFalsy();
  });

  it('should list available pizzas', () => {
    jest.spyOn(usePizzas, 'default').mockImplementation(() => ({
      pizzas: [pizzaMargherita, pizzaSalami],
      loadingPizzas: false,
      errorLoadingPizzas: undefined,
    }));

    render(<Marketplace />);

    expect(screen.queryAllByTestId(TestId.MARKETPLACE_PIZZA_CARD)).toHaveLength(2);
    expect(screen.queryByText(pizzaMargherita.name)).toBeVisible();
    expect(screen.queryByText(pizzaSalami.name)).toBeVisible();
    expect(screen.queryByTestId(TestId.LOADING_SPINNER)).toBeFalsy();
  });
});
