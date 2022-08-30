import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import PizzaCard from './PizzaCard/PizzaCard';
import usePizzas from '../../hooks/usePizzas';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';

interface Props {}

const Marketplace: React.FC<Props> = () => {
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
    </Box>
  );
};
export default Marketplace;
