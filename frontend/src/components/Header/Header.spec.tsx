import { screen } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '../../testUtils/renderWithProviders';

describe('Header', () => {
  it('should render header title', () => {
    renderWithProviders(<Header title="Test header" />);
    expect(screen.getByText('Test header')).toBeVisible();
  });
});
