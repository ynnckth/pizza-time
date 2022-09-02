import React, { useCallback, useEffect } from 'react';
import { Box, Button, Container, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
  placeOrder,
  removeOrderItem,
  selectOrderItems,
  selectPastOrders,
  selectPlaceOrderError,
  selectPlaceOrderStatus,
} from '../../redux/Slices/CheckoutSlice';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { TestId } from '../../testUtils/TestId';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../Navigation';
import { calculateTotalOrderPrice } from '../../utils/calculateTotalOrderPrice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';
import { RequestStatus } from '../../utils/RequestStatus';

export const PLACE_ORDER_SUCCESS_MESSAGE = 'Successfully placed order';

// TODO (low): add back button to overview
const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const orderItems = useAppSelector(selectOrderItems);
  const placeOrderError = useAppSelector(selectPlaceOrderError);
  const placeOrderStatus = useAppSelector(selectPlaceOrderStatus);
  const orderHistory = useAppSelector(selectPastOrders);

  const getTotalPrice = useCallback(() => {
    return calculateTotalOrderPrice(orderItems);
  }, [orderItems]);

  useEffect(() => {
    if (placeOrderError && placeOrderStatus === RequestStatus.FAILED) {
      toast.error(placeOrderError);
    }
  }, [placeOrderError, placeOrderStatus]);

  useEffect(() => {
    if (placeOrderStatus === RequestStatus.SUCCESSFUL && !placeOrderError) {
      toast.success(PLACE_ORDER_SUCCESS_MESSAGE);
      navigate(Page.PAST_ORDERS);
    }
  }, [orderHistory, placeOrderStatus, navigate, placeOrderError]);

  const validateAndPlaceOrder = () => {
    if (orderItems.length < 1) {
      alert('Cannot place order since your cart is empty!');
      return;
    }
    dispatch(placeOrder({ orderItems: orderItems }));
  };

  if (orderItems.length < 1) {
    return <Typography data-testid={TestId.CHECKOUT_EMPTY_CART_MESSAGE}>Your cart is empty.</Typography>;
  }

  if (placeOrderStatus === RequestStatus.LOADING) {
    return <LoadingSpinner loadingText={'Placing your order ...'} />;
  }

  return (
    <Container maxWidth={'sm'}>
      <Typography>Please review your order</Typography>
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

      {/* TODO (high): add a form with user details using formik */}

      <Button
        variant="contained"
        onClick={() => validateAndPlaceOrder()}
        data-testid={TestId.CHECKOUT_PLACE_ORDER_BUTTON}
      >
        Place order
      </Button>
    </Container>
  );
};
export default Checkout;
