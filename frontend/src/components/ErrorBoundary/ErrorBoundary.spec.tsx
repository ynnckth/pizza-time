import { renderWithProviders } from '../../testUtils/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import ErrorBoundary, { FALLBACK_ERROR_BOUNDARY_MESSAGE } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should render children if no error', () => {
    renderWithProviders(
      <ErrorBoundary>
        <div>Children</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Children')).toBeVisible();
  });

  it('should render fallback error message given uncaught error in child component', async () => {
    const errorMessage = 'Something went wrong!';
    const ComponentThatThrowsError = () => {
      throw new Error(errorMessage);
    };

    renderWithProviders(
      <ErrorBoundary>
        <ComponentThatThrowsError />
        <div>Children</div>
      </ErrorBoundary>
    );

    await waitFor(() => expect(screen.getByText(FALLBACK_ERROR_BOUNDARY_MESSAGE)).toBeVisible());
    await waitFor(() => expect(screen.getByText(errorMessage)).toBeVisible());
    await waitFor(() => expect(screen.queryByText('Children')).toBeFalsy());
  });
});
