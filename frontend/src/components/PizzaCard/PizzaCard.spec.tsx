import PizzaCard from './PizzaCard';
import { pizzaMargherita } from '../../testUtils/TestPizzas';
import { renderWithProviders } from '../../testUtils/renderWithProviders';

describe('PizzaCard', () => {
  // Update snapshot with "jest --updateSnapshot"
  it('Renders snapshot correctly', () => {
    const { asFragment } = renderWithProviders(<PizzaCard pizza={pizzaMargherita} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
