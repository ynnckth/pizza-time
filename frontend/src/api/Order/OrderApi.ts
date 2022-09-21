import { Order, PlaceOrderRequest } from '../../../generated';

export const ordersBaseUrl = `${process.env.REACT_APP_ORDER_SERVICE_API_BASE_URL}/api/orders`;

export const fetchPastOrders = async (): Promise<Order[]> => {
  const response = await fetch(ordersBaseUrl);
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.errorMessage);
  }
  return responseBody;
};

export const placeOrder = async (placeOrderRequest: PlaceOrderRequest): Promise<Order> => {
  const response = await fetch(ordersBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(placeOrderRequest),
  });
  return response.json();
};
