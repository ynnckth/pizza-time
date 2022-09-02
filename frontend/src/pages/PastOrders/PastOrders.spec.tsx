import { renderWithProviders } from '../../testUtils/renderWithProviders';
import PastOrders from './PastOrders';

// TODO (high): Need to use real fetch calls in API's and instead  use something like MSW to intercept network requests
//  see https://redux.js.org/usage/writing-tests#writing-integration-tests-with-components
describe('PastOrders', () => {
  it('should ', () => {
    renderWithProviders(<PastOrders />);
  });
});
