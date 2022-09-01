import { renderWithProviders } from '../../testUtils/renderWithProviders';
import Checkout from './Checkout';
import { screen } from '@testing-library/react';
import { TestId } from '../../testUtils/TestId';
import { pizzaMargherita, pizzaSalami } from '../../testUtils/TestPizzas';

describe('Checkout', () => {
  it('should show empty cart message if no order items present', () => {
    renderWithProviders(<Checkout />);

    expect(screen.getByTestId(TestId.CHECKOUT_EMPTY_CART_MESSAGE)).toBeVisible();
    expect(screen.queryByTestId(TestId.CHECKOUT_TOTAL_PRICE)).toBeFalsy();
    expect(screen.queryByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON)).toBeFalsy();
  });

  it('should list order items', () => {
    const initialOrderItems = [pizzaMargherita, pizzaMargherita, pizzaSalami];
    const expectedTotalPrice = 2 * pizzaMargherita.unitPrice + pizzaSalami.unitPrice;

    renderWithProviders(<Checkout />, { preloadedState: { checkout: { orderItems: initialOrderItems } } });

    expect(screen.queryByTestId(TestId.CHECKOUT_EMPTY_CART_MESSAGE)).toBeFalsy();
    expect(screen.queryAllByTestId(TestId.CHECKOUT_ORDER_ITEM)).toHaveLength(initialOrderItems.length);
    expect(screen.queryByTestId(TestId.CHECKOUT_TOTAL_PRICE)).toHaveTextContent(`$${expectedTotalPrice}`);
    expect(screen.queryByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON)).toBeVisible();
  });
});
