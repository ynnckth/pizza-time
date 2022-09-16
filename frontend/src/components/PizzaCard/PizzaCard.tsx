import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import pizzaImage from '../../assets/pizza.png';
import { TestId } from '../../testUtils/TestId';
import { useAppDispatch } from '../../redux/Hooks';
import { addOrderItem } from '../../redux/Slices/Checkout/CheckoutSlice';
import { OrderItem } from '../../../generated';

interface Props {
  pizza: OrderItem;
}

const PizzaCard: React.FC<Props> = ({ pizza }) => {
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ width: 250, height: 320, margin: 2 }} data-testid={TestId.MARKETPLACE_PIZZA_CARD}>
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
        <Button
          size="small"
          onClick={() => dispatch(addOrderItem(pizza))}
          data-testid={TestId.MARKETPLACE_ADD_PIZZA_TO_CART}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
export default PizzaCard;
