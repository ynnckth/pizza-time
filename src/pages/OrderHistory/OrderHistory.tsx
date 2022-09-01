import React from 'react';
import { Box, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useAppSelector } from '../../redux/Hooks';
import { selectPastOrders } from '../../redux/Slices/CheckoutSlice';
import { calculateTotalOrderPrice } from '../../utils/calculateTotalOrderPrice';

// TODO: add navigation button to get back to market place
const OrderHistory = () => {
  const pastOrders = useAppSelector(selectPastOrders);

  return (
    <Container maxWidth={'sm'}>
      <Typography>Your past orders</Typography>
      <Box sx={{ maxWidth: 500 }}>
        <List>
          {pastOrders.map((order, idx) => (
            <ListItem key={`past-order-${idx}`}>
              <ListItemText
                primary={`Order ${order.orderId} ${order.orderItems
                  .map((item) => item.name)
                  .join(', ')} - $${calculateTotalOrderPrice(order.orderItems)}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};
export default OrderHistory;
