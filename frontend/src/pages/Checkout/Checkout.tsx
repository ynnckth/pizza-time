import React, { useCallback } from 'react';
import { Alert, Box, Container, Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
  placeOrder,
  removeOrderItem,
  selectOrderItems,
  selectPlaceOrderStatus,
} from '../../redux/Slices/Checkout/CheckoutSlice';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { TestId } from '../../testUtils/TestId';
import { useNavigate } from 'react-router-dom';
import { calculateTotalOrderPrice } from '../../utils/calculateTotalOrderPrice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';
import { RequestStatus } from '../../utils/RequestStatus';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { CheckoutFormValues } from '../../components/CheckoutForm/CheckoutFormValues';

export const PLACE_ORDER_SUCCESS_MESSAGE = 'Successfully placed order';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const orderItems = useAppSelector(selectOrderItems);
  const placeOrderStatus = useAppSelector(selectPlaceOrderStatus);

  const getTotalPrice = useCallback(() => {
    return calculateTotalOrderPrice(orderItems);
  }, [orderItems]);

  const validateAndPlaceOrder = (checkoutFormValues: CheckoutFormValues) => {
    if (orderItems.length < 1) {
      toast.warning('Cannot place order since your cart is empty!');
      return;
    }
    dispatch(
      placeOrder({
        placeOrderRequest: {
          orderItems: orderItems,
          customer: { ...checkoutFormValues },
          orderDate: new Date().toISOString(),
        },
        navigate,
      })
    );
  };

  if (orderItems.length < 1) {
    return (
      <Alert severity="info" data-testid={TestId.CHECKOUT_EMPTY_CART_MESSAGE}>
        Your cart is empty.
      </Alert>
    );
  }

  if (placeOrderStatus === RequestStatus.LOADING) {
    return <LoadingSpinner loadingText={'Placing your order ...'} />;
  }

  return (
    <Container maxWidth={'sm'}>
      <Typography variant={'h5'}>Please review your order</Typography>
      <Box sx={{ maxWidth: 500 }}>
        <List>
          {orderItems
            .map((item) => item) // need to copy since sort mutates the list which is immutable
            .sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
            .map((item, idx) => (
              <ListItem
                key={`checkout-order-item-${idx}`}
                secondaryAction={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{`$${item.unitPrice}`}</Typography>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => dispatch(removeOrderItem(item))}
                      data-testid={TestId.CHECKOUT_REMOVE_ORDER_ITEM}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                }
                data-testid={TestId.CHECKOUT_ORDER_ITEM}
              >
                <ListItemText primary={`Pizza ${item.name}`} />
              </ListItem>
            ))}
        </List>
      </Box>

      <Typography data-testid={TestId.CHECKOUT_TOTAL_PRICE}>{`Total: $${getTotalPrice()}`}</Typography>

      <Divider sx={{ marginTop: 5 }} />

      <Box sx={{ marginTop: 5 }}>
        <CheckoutForm onSubmit={(checkoutFormValues) => validateAndPlaceOrder(checkoutFormValues)} />
      </Box>
    </Container>
  );
};
export default Checkout;
