import React from 'react';
import { Box, Fab, Typography } from '@mui/material';
import PizzaCard from '../../components/PizzaCard/PizzaCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/Hooks';
import { selectOrderItems } from '../../redux/Slices/Checkout/CheckoutSlice';
import { TestId } from '../../testUtils/TestId';
import { Page } from '../../Navigation';
import { useFetchAllPizzasQuery } from '../../redux/Slices/Marketplace/MarketplaceSlice';

const Marketplace = () => {
  const navigate = useNavigate();
  const { data: pizzas, isLoading: loadingPizzas } = useFetchAllPizzasQuery();
  const orderItems = useAppSelector(selectOrderItems);

  if (loadingPizzas) {
    return <LoadingSpinner loadingText={'Retrieving available pizzas ...'} />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      {(pizzas || []).map((pizza, key) => (
        <PizzaCard pizza={pizza} key={key} />
      ))}
      <Fab
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        color="primary"
        aria-label="checkout"
        onClick={() => navigate(Page.CHECKOUT)}
        data-testid={TestId.MARKETPLACE_CART_BUTTON}
      >
        <Typography data-testid={TestId.MARKETPLACE_NO_OF_ORDER_ITEMS}>{orderItems.length}</Typography>
        <ShoppingCart />
      </Fab>
    </Box>
  );
};
export default Marketplace;
