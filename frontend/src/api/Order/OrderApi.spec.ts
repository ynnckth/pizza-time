import { rest } from 'msw';
import { fetchPastOrders, ordersBaseUrl, placeOrder } from './OrderApi';
import { samplePastOrders } from '../../testUtils/TestData/TestOrders';
import { setupServer } from 'msw/node';
import { Customer, Order, PlaceOrderRequest } from '../../../generated';
import { pizzaMargherita, pizzaSalami } from '../../testUtils/TestData/TestPizzas';

export const handlers = [
  rest.get(ordersBaseUrl, async (req, res, ctx) => {
    return res(ctx.json(samplePastOrders), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe('OrderApi', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const backendErrorResponseBody = { errorMessage: 'Something went wrong!' };

  describe('fetchPastOrders', () => {
    it('should return orders successfully', async () => {
      const orders = await fetchPastOrders();
      expect(orders.length).toBe(samplePastOrders.length);
    });

    it('should throw error containing details if backend returns 500 server error response', async () => {
      server.use(
        rest.get(ordersBaseUrl, async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(backendErrorResponseBody));
        })
      );
      await expect(fetchPastOrders()).rejects.toThrow(backendErrorResponseBody.errorMessage);
    });

    it('should throw error containing details if backend returns 400 server error response', async () => {
      server.use(
        rest.get(ordersBaseUrl, async (req, res, ctx) => {
          return res(ctx.status(400), ctx.json(backendErrorResponseBody));
        })
      );
      await expect(fetchPastOrders()).rejects.toThrow(backendErrorResponseBody.errorMessage);
    });

    it('should throw error if network request failed', async () => {
      const errorMessage = 'Network request failed';
      server.use(
        rest.get(ordersBaseUrl, async (req, res) => {
          return res.networkError(errorMessage);
        })
      );
      await expect(fetchPastOrders()).rejects.toThrow(errorMessage);
    });
  });

  describe('placeOrder', () => {
    it('should place an order successfully', async () => {
      const orderItems = [pizzaMargherita, pizzaSalami];
      const customer: Customer = { firstName: 'John', lastName: 'Doe', email: 'john@doe.com' };
      const orderDate = '2022-09-21T04:49:43.074Z';
      const generatedOrderId = '007';
      server.use(
        rest.post(ordersBaseUrl, async (req, res, ctx) => {
          const orderRequest = await req.json();
          const createdOrder: Order = { ...orderRequest, orderId: generatedOrderId };
          return res(ctx.json(createdOrder), ctx.delay(150));
        })
      );

      const placedOrder = await placeOrder({ orderDate: orderDate, orderItems: orderItems, customer: customer });

      expect(placedOrder.orderId).toBe(generatedOrderId);
      expect(placedOrder.orderItems).toStrictEqual(orderItems);
      expect(placedOrder.customer).toStrictEqual(customer);
      expect(placedOrder.orderDate).toBe(orderDate);
    });

    it('should throw error containing details if backend returns 500 server error response', async () => {
      server.use(
        rest.post(ordersBaseUrl, async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(backendErrorResponseBody));
        })
      );
      await expect(placeOrder({} as PlaceOrderRequest)).rejects.toThrow(backendErrorResponseBody.errorMessage);
    });

    it('should throw error containing details if backend returns 400 server error response', async () => {
      server.use(
        rest.post(ordersBaseUrl, async (req, res, ctx) => {
          return res(ctx.status(400), ctx.json(backendErrorResponseBody));
        })
      );
      await expect(placeOrder({} as PlaceOrderRequest)).rejects.toThrow(backendErrorResponseBody.errorMessage);
    });

    it('should throw error if network request failed', async () => {
      const errorMessage = 'Network request failed';
      server.use(
        rest.post(ordersBaseUrl, async (req, res) => {
          return res.networkError(errorMessage);
        })
      );
      await expect(placeOrder({} as PlaceOrderRequest)).rejects.toThrow(errorMessage);
    });
  });
});
