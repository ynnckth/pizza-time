import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('should render header title', () => {
    render(<Header title="Test header" />);
    expect(screen.getByText('Test header')).toBeVisible();
  });
});
