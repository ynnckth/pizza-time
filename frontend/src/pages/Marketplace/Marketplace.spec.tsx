import { fireEvent, screen, waitFor } from '@testing-library/react';
import Marketplace from './Marketplace';
import { TestId } from '../../testUtils/TestId';
import { pizzaMargherita, pizzaSalami } from '../../testUtils/TestPizzas';
import { renderWithProviders } from '../../testUtils/renderWithProviders';
import { pizzasBaseUrl } from '../../api/Pizza/PizzaApi';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const testPizzas = [pizzaMargherita, pizzaSalami];

export const handlers = [
  rest.get(pizzasBaseUrl, async (req, res, ctx) => {
    return res(ctx.json(testPizzas), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe('Marketplace', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should show loading spinner while retrieving pizzas', () => {
    server.use(
      rest.get(pizzasBaseUrl, async (req, res, ctx) => {
        return res(ctx.json([]), ctx.delay(1000));
      })
    );

    renderWithProviders(<Marketplace />);

    expect(screen.getByTestId(TestId.LOADING_SPINNER)).toBeVisible();
    expect(screen.queryByTestId(TestId.MARKETPLACE_PIZZA_CARD)).toBeFalsy();
  });

  it('should list available pizzas', async () => {
    renderWithProviders(<Marketplace />);

    await waitFor(() => expect(screen.queryAllByTestId(TestId.MARKETPLACE_PIZZA_CARD)).toHaveLength(testPizzas.length));
    expect(screen.queryByText(pizzaMargherita.name)).toBeVisible();
    expect(screen.queryByText(pizzaSalami.name)).toBeVisible();
    expect(screen.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS)).toHaveTextContent('0');
    expect(screen.queryByTestId(TestId.LOADING_SPINNER)).toBeFalsy();
  });

  it('should update displayed items in cart', async () => {
    server.use(
      rest.get(pizzasBaseUrl, async (req, res, ctx) => {
        return res(ctx.json([pizzaMargherita]), ctx.delay(150));
      })
    );

    renderWithProviders(<Marketplace />);

    await waitFor(() => expect(screen.queryByTestId(TestId.LOADING_SPINNER)).toBeFalsy());
    fireEvent.click(screen.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART));
    fireEvent.click(screen.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART));
    fireEvent.click(screen.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART));

    expect(screen.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS)).toHaveTextContent('3');
  });

  it('should show error toast if failed to fetch pizzas', async () => {
    const errorMessage = 'Failed to fetch pizzas';
    server.use(
      rest.get(pizzasBaseUrl, async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: errorMessage }));
      })
    );

    renderWithProviders(<Marketplace />);

    await waitFor(() => expect(screen.getByText(errorMessage)).toBeVisible());
  });
});
