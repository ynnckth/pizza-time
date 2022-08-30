import React from 'react';
import { Box } from '@mui/material';
import { Pizza } from '../../models/Pizza';
import PizzaCard from './PizzaCard/PizzaCard';

interface Props {}

const Marketplace: React.FC<Props> = () => {
  // TODO: instead fetch from somewhere
  const allPizzas: Pizza[] = [
    {
      name: 'Margherita',
      description: 'Plain and boring',
      unitPrice: 10,
      isAvailable: true,
    },
    {
      name: 'Salami',
      description: 'Nice and spicy!',
      unitPrice: 12,
      isAvailable: true,
    },
    {
      name: 'Hawaii',
      description: 'Really???',
      unitPrice: 11,
      isAvailable: true,
    },
  ];

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
      {allPizzas.map((pizza, key) => (
        <PizzaCard pizza={pizza} key={key} />
      ))}
    </Box>
  );
};
export default Marketplace;
