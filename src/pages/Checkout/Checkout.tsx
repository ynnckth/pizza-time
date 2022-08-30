import React from 'react';
import { Box, Button, Typography } from '@mui/material';

/* TODO: implement page with option to checkout or remove items from it, list prices and total */
const Checkout = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {/* TODO: display list of selected items (with price) with option to remove single items */}
      <Typography>Summary of selected items in cart with option to remove</Typography>
      {/* TODO: display total price */}
      <Button variant="contained">Place order</Button>
    </Box>
  );
};
export default Checkout;
