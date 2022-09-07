import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import { TestId } from '../../testUtils/TestId';
import { CheckoutFormValues } from './CheckoutFormValues';

interface Props {
  onSubmit: (checkoutFormValues: CheckoutFormValues) => void;
}

const CheckoutForm: React.FC<Props> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant={'h5'}>Your details</Typography>
      <TextField
        id="firstName"
        name="firstName"
        label="First name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        variant={'standard'}
        inputProps={{ 'data-testid': TestId.CHECKOUT_FORM_FIRST_NAME }}
      />

      <br />

      <TextField
        id="lastName"
        name="lastName"
        label="Last name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        variant={'standard'}
        inputProps={{ 'data-testid': TestId.CHECKOUT_FORM_LAST_NAME }}
      />

      <br />

      <TextField
        id="email"
        name="email"
        label="E-Mail"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        variant={'standard'}
        inputProps={{ 'data-testid': TestId.CHECKOUT_FORM_EMAIL }}
      />

      <br />
      <br />

      <Button variant="contained" type="submit" data-testid={TestId.CHECKOUT_PLACE_ORDER_BUTTON}>
        Place order
      </Button>
    </form>
  );
};
export default CheckoutForm;
