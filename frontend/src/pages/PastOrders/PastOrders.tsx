import React, { useEffect } from 'react';
import { Box, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { getPastOrders, selectPastOrders } from '../../redux/Slices/CheckoutSlice';
import { calculateTotalOrderPrice } from '../../utils/calculateTotalOrderPrice';
import { TestId } from '../../testUtils/TestId';

// TODO (low): add navigation button to get back to market place
const PastOrders = () => {
  const pastOrders = useAppSelector(selectPastOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPastOrders());
  }, [dispatch]);

  // TODO (high): show loading spinner while loading past orders
  // TODO (high): show error toast if failed to load past orders

  // TODO (low): pretty display past orders
  return (
    <Container maxWidth={'sm'}>
      <Typography>Your past orders:</Typography>
      <Box sx={{ maxWidth: 500 }}>
        {pastOrders.length < 1 && (
          <Typography data-testid={TestId.PAST_ORDERS_NO_ORDERS_MESSAGE}>You don't have any past orders</Typography>
        )}
        <List>
          {pastOrders.map((order, idx) => (
            <ListItem key={`past-order-${idx}`}>
              <ListItemText
                primary={`Order ${order.orderId} ${order.orderItems
                  .map((item) => item.name)
                  .join(', ')} - $${calculateTotalOrderPrice(order.orderItems)}`}
                data-testid={TestId.PAST_ORDERS_ORDER}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};
export default PastOrders;
