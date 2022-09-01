import { PlaceOrderRequest, PlaceOrderResponse } from './PlaceOrderDto';
import { v4 as uuidv4 } from 'uuid';

export const placeOrder = (placeOrderRequest: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      // reject('Something went wrong placing your order!');
      resolve({
        orderId: uuidv4(),
        orderItems: placeOrderRequest.orderItems,
      });
    }, 3000)
  );
};
