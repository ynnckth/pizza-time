import { renderWithProviders } from '../../testUtils/renderWithProviders';
import Checkout, { PLACE_ORDER_SUCCESS_MESSAGE } from './Checkout';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { TestId } from '../../testUtils/TestId';
import { pizzaMargherita, pizzaSalami } from '../../testUtils/TestData/TestPizzas';
import { initialCheckoutState } from '../../redux/Slices/Checkout/CheckoutSlice';
import { Page } from '../../Navigation';
import { rest } from 'msw';
import { ordersBaseUrl } from '../../api/Order/OrderApi';
import { setupServer } from 'msw/node';
import { Order } from '../../../generated';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
}));

// msw is used to intercept network requests
export const handlers = [
  rest.post(ordersBaseUrl, async (req, res, ctx) => {
    const request = await req.json();
    const placeOrderResponse: Order = {
      orderId: 'a367772a-eda3-4057-95f9-a26a83b15f62',
      ...request,
    };
    return res(ctx.json(placeOrderResponse), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe('Checkout', () => {
  beforeAll(() => server.listen());
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should show empty cart message if no order items present', () => {
    renderWithProviders(<Checkout />);

    expect(screen.getByTestId(TestId.CHECKOUT_EMPTY_CART_MESSAGE)).toBeVisible();
    expect(screen.queryByTestId(TestId.CHECKOUT_TOTAL_PRICE)).toBeFalsy();
    expect(screen.queryByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON)).toBeFalsy();
  });

  it('should list order items', () => {
    const orderItems = [pizzaMargherita, pizzaMargherita, pizzaSalami];
    const expectedTotalPrice = 2 * pizzaMargherita.unitPrice + pizzaSalami.unitPrice;

    renderWithProviders(<Checkout />, {
      preloadedState: { checkout: { ...initialCheckoutState, orderItems: orderItems } },
    });

    expect(screen.queryByTestId(TestId.CHECKOUT_EMPTY_CART_MESSAGE)).toBeFalsy();
    expect(screen.queryAllByTestId(TestId.CHECKOUT_ORDER_ITEM)).toHaveLength(orderItems.length);
    expect(screen.queryByTestId(TestId.CHECKOUT_TOTAL_PRICE)).toHaveTextContent(`$${expectedTotalPrice}`);
    expect(screen.queryByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON)).toBeVisible();
  });

  it('should remove unique order items from the list', async () => {
    const orderItems = [pizzaMargherita, pizzaSalami];
    renderWithProviders(<Checkout />, {
      preloadedState: { checkout: { ...initialCheckoutState, orderItems: orderItems } },
    });

    fireEvent.click(screen.queryAllByTestId(TestId.CHECKOUT_REMOVE_ORDER_ITEM)[0]);

    await waitFor(() =>
      expect(screen.queryAllByTestId(TestId.CHECKOUT_ORDER_ITEM)).toHaveLength(orderItems.length - 1)
    );
  });

  it('should remove duplicate order items from the list', async () => {
    const orderItems = [pizzaMargherita, pizzaMargherita, pizzaSalami, pizzaSalami];
    renderWithProviders(<Checkout />, {
      preloadedState: { checkout: { ...initialCheckoutState, orderItems: orderItems } },
    });

    fireEvent.click(screen.queryAllByTestId(TestId.CHECKOUT_REMOVE_ORDER_ITEM)[0]);

    await waitFor(() =>
      expect(screen.queryAllByTestId(TestId.CHECKOUT_ORDER_ITEM)).toHaveLength(orderItems.length - 1)
    );
  });

  it('should redirect to past orders page and show success toast after successfully placed order', async () => {
    renderWithProviders(<Checkout />, {
      preloadedState: { checkout: { ...initialCheckoutState, orderItems: [pizzaMargherita, pizzaSalami] } },
    });
    fireEvent.change(screen.getByTestId(TestId.CHECKOUT_FORM_LAST_NAME), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId(TestId.CHECKOUT_FORM_FIRST_NAME), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId(TestId.CHECKOUT_FORM_EMAIL), { target: { value: 'john.doe@test.com' } });

    fireEvent.click(screen.getByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON));

    await waitFor(() => expect(screen.getByTestId(TestId.LOADING_SPINNER)).toBeVisible());
    await waitFor(() => expect(screen.queryByTestId(TestId.LOADING_SPINNER)).toBeFalsy());
    await waitFor(() => expect(screen.getByText(PLACE_ORDER_SUCCESS_MESSAGE)).toBeVisible());
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(Page.PAST_ORDERS));
  });

  it('should show empty cart message if all order items are removed from cart', async () => {
    renderWithProviders(<Checkout />, {
      preloadedState: { checkout: { ...initialCheckoutState, orderItems: [pizzaMargherita] } },
    });

    fireEvent.click(screen.queryAllByTestId(TestId.CHECKOUT_REMOVE_ORDER_ITEM)[0]);

    await waitFor(() => expect(screen.queryByTestId(TestId.CHECKOUT_EMPTY_CART_MESSAGE)).toBeVisible());
    await waitFor(() => expect(screen.queryByTestId(TestId.CHECKOUT_ORDER_ITEM)).toBeFalsy());
  });
});
