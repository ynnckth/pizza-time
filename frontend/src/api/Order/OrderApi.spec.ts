import { rest } from 'msw';
import { fetchPastOrders, ordersBaseUrl } from './OrderApi';
import { samplePastOrders } from '../../testUtils/TestData/TestOrders';
import { setupServer } from 'msw/node';

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

  describe('fetchPastOrders', () => {
    it('should return orders successfully', async () => {
      const orders = await fetchPastOrders();
      expect(orders.length).toBe(samplePastOrders.length);
    });

    it('should throw error containing details if backend returns 500 server error response', async () => {
      const errorMessage = 'Something went wrong!';
      server.use(
        rest.get(ordersBaseUrl, async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ errorMessage: errorMessage }));
        })
      );
      await expect(fetchPastOrders()).rejects.toThrow(errorMessage);
    });

    it('should throw error containing details if backend returns 400 server error response', async () => {
      const errorMessage = 'Wrong input provided!';
      server.use(
        rest.get(ordersBaseUrl, async (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({ errorMessage: errorMessage }));
        })
      );
      await expect(fetchPastOrders()).rejects.toThrow(errorMessage);
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
});
