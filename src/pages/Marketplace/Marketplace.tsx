import React, { useEffect } from 'react';
import { Box, Fab } from '@mui/material';
import PizzaCard from '../../components/PizzaCard/PizzaCard';
import usePizzas from '../../hooks/usePizzas';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const navigate = useNavigate();
  const { pizzas, loadingPizzas, errorLoadingPizzas } = usePizzas();

  useEffect(() => {
    if (errorLoadingPizzas) toast.error(errorLoadingPizzas);
  }, [errorLoadingPizzas]);

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
      {pizzas.map((pizza, key) => (
        <PizzaCard pizza={pizza} key={key} />
      ))}
      {/* TODO: display number of items in cart next to icon */}
      <Fab
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        color="primary"
        aria-label="checkout"
        onClick={() => navigate('/checkout')}
      >
        <ShoppingCart />
      </Fab>
    </Box>
  );
};
export default Marketplace;
