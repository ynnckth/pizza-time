import PizzaCard from './PizzaCard';
import { pizzaMargherita } from '../../testUtils/TestPizzas';
import { renderWithProviders } from '../../testUtils/renderWithProviders';

describe('PizzaCard', () => {
  // Update snapshot with "jest --updateSnapshot"
  it('should match previous snapshot', () => {
    const { asFragment } = renderWithProviders(<PizzaCard pizza={pizzaMargherita} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
