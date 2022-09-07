import { renderWithProviders } from '../../testUtils/renderWithProviders';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';
import { TestId } from '../../testUtils/TestId';
import { CheckoutFormValues } from './CheckoutFormValues';

describe('CheckoutForm', () => {
  it('should render all form fields', () => {
    renderWithProviders(<CheckoutForm onSubmit={jest.fn()} />);

    expect(screen.getByTestId(TestId.CHECKOUT_FORM_FIRST_NAME)).toBeVisible();
    expect(screen.getByTestId(TestId.CHECKOUT_FORM_LAST_NAME)).toBeVisible();
    expect(screen.getByTestId(TestId.CHECKOUT_FORM_EMAIL)).toBeVisible();
    expect(screen.getByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON)).toBeVisible();
  });

  it('should not submit if fields are empty', async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<CheckoutForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON));

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
    await waitFor(() => expect(screen.queryAllByText('Required')).toHaveLength(3));
  });

  it('should submit form given valid inputs', async () => {
    const onSubmit = jest.fn();
    const formValues: CheckoutFormValues = { firstName: 'John', lastName: 'Doe', email: 'john.doe@test.com' };
    renderWithProviders(<CheckoutForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByTestId(TestId.CHECKOUT_FORM_FIRST_NAME), { target: { value: formValues.firstName } });
    fireEvent.change(screen.getByTestId(TestId.CHECKOUT_FORM_LAST_NAME), { target: { value: formValues.lastName } });
    fireEvent.change(screen.getByTestId(TestId.CHECKOUT_FORM_EMAIL), { target: { value: formValues.email } });
    fireEvent.click(screen.getByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(formValues));
  });
});
