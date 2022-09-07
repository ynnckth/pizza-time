import { renderWithProviders } from '../../testUtils/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import PastOrders from './PastOrders';
import { rest } from 'msw';
import { ordersBaseUrl } from '../../api/Order/OrderApi';
import { pizzaMargherita, pizzaSalami } from '../../testUtils/TestPizzas';
import { TestId } from '../../testUtils/TestId';
import { setupServer } from 'msw/node';
import { Order } from '../../../../generated';

const samplePastOrders: Order[] = [
  {
    orderId: '0001',
    orderItems: [pizzaMargherita, pizzaSalami],
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
    },
    orderDate: '2022-09-04T07:58:49.098Z',
  },
  {
    orderId: '0002',
    orderItems: [pizzaMargherita],
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
    },
    orderDate: '2022-09-04T07:58:49.098Z',
  },
];

// msw is used to intercept network requests
export const handlers = [
  rest.get(ordersBaseUrl, async (req, res, ctx) => {
    return res(ctx.json(samplePastOrders), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe('PastOrders', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should show past orders', async () => {
    renderWithProviders(<PastOrders />);

    await waitFor(() => expect(screen.getByTestId(TestId.LOADING_SPINNER)).toBeVisible());
    await waitFor(() => expect(screen.queryByTestId(TestId.LOADING_SPINNER)).toBeFalsy());
    await waitFor(() =>
      expect(screen.queryAllByTestId(TestId.PAST_ORDERS_ORDER)).toHaveLength(samplePastOrders.length)
    );
  });

  it('should show message if no past orders present', async () => {
    server.use(
      rest.get(ordersBaseUrl, async (req, res, ctx) => {
        return res(ctx.json([]), ctx.delay(150));
      })
    );

    renderWithProviders(<PastOrders />);

    await waitFor(() => expect(screen.getByTestId(TestId.LOADING_SPINNER)).toBeVisible());
    await waitFor(() => expect(screen.queryByTestId(TestId.LOADING_SPINNER)).toBeFalsy());
    await waitFor(() => expect(screen.getByTestId(TestId.PAST_ORDERS_NO_ORDERS_MESSAGE)).toBeVisible());
    await waitFor(() => expect(screen.queryAllByTestId(TestId.PAST_ORDERS_ORDER)).toHaveLength(0));
  });

  it('should show error toast if failed to fetch past orders', async () => {
    const errorMessage = 'Network request failed';
    server.use(
      rest.get(ordersBaseUrl, async (req, res) => {
        return res.networkError(errorMessage);
      })
    );

    renderWithProviders(<PastOrders />);

    await waitFor(() => expect(screen.getByTestId(TestId.LOADING_SPINNER)).toBeVisible());
    await waitFor(() => expect(screen.queryByTestId(TestId.LOADING_SPINNER)).toBeFalsy());
    await waitFor(() => expect(screen.getByText(errorMessage)).toBeVisible());
    await waitFor(() => expect(screen.getByTestId(TestId.PAST_ORDERS_NO_ORDERS_MESSAGE)).toBeVisible());
    await waitFor(() => expect(screen.queryAllByTestId(TestId.PAST_ORDERS_ORDER)).toHaveLength(0));
  });
});
