import React, { useCallback } from 'react';
import { Box, Button, Container, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { selectOrderItems } from '../../redux/Slices/CheckoutSlice';
import { useAppSelector } from '../../redux/Hooks';
import { TestId } from '../../testUtils/TestId';

// TODO: add back button to overview
const Checkout = () => {
  const orderItems = useAppSelector(selectOrderItems);

  const getTotalPrice = useCallback(() => {
    return orderItems.map((item) => item.unitPrice).reduce((sum, i) => sum + i, 0);
  }, [orderItems]);

  if (orderItems.length < 1) {
    return <Typography data-testid={TestId.CHECKOUT_EMPTY_CART_MESSAGE}>Your cart is empty.</Typography>;
  }

  return (
    <Container maxWidth={'sm'}>
      <Typography>Please review your order</Typography>
      <Box sx={{ maxWidth: 500 }}>
        <List>
          {orderItems.map((item, idx) => (
            <ListItem
              key={`checkout-order-item-${idx}`}
              secondaryAction={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>{`$${item.unitPrice}`}</Typography>
                  <IconButton edge="end" aria-label="delete" onClick={() => alert('Not yet implemented!')}>
                    {/* TODO: implement option to delete */}
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

      {/* TODO: add a form with user details using formik */}

      {/* TODO: dispatch action that calls API and shows success/error notification and adds order to order history */}
      <Button variant="contained" data-testid={TestId.CHECKOUT_PLACE_ORDER_BUTTON}>
        Place order
      </Button>
    </Container>
  );
};
export default Checkout;
