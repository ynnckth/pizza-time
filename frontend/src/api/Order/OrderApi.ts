import { PlaceOrderRequest, PlaceOrderResponse } from './PlaceOrderDto';
import { v4 as uuidv4 } from 'uuid';
import { pizzaMargherita, pizzaSalami } from '../../testUtils/TestPizzas';

export const fetchPastOrders = (): Promise<PlaceOrderResponse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          orderId: uuidv4(),
          orderItems: [pizzaMargherita],
        },
        {
          orderId: uuidv4(),
          orderItems: [pizzaMargherita, pizzaSalami],
        },
      ]);
    }, 2000);
  });
};

export const placeOrder = (placeOrderRequest: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      // reject('Something went wrong placing your order!');
      resolve({
        orderId: uuidv4(),
        orderItems: placeOrderRequest.orderItems,
      });
    }, 3000)
  );
};
