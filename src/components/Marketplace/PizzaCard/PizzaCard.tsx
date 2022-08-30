import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Pizza } from '../../../models/Pizza';
import pizzaImage from '../../../assets/pizza.png';
import { TestId } from '../../../testUtils/TestId';

interface Props {
  pizza: Pizza;
}

const PizzaCard: React.FC<Props> = ({ pizza }) => {
  return (
    <Card sx={{ width: 200, height: 320, margin: 2 }} data-testid={TestId.MARKETPLACE_PIZZA_CARD}>
      <CardMedia component="img" height="140" src={pizzaImage} alt="delicious pizza" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pizza.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pizza.description}
        </Typography>
        <Typography variant={'body1'}>{`$${pizza.unitPrice}`}</Typography>
      </CardContent>
      <CardActions>
        {/* TODO: add pizza to cart */}
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
};
export default PizzaCard;
