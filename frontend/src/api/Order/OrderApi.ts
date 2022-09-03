import {PlaceOrderRequest, PlaceOrderResponse} from './PlaceOrderDto';

export const ordersBaseUrl = '/api/orders';

export const fetchPastOrders = async (): Promise<PlaceOrderResponse[]> => {
  const response = await fetch(ordersBaseUrl);
  return response.json();
};

export const placeOrder = async (placeOrderRequest: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
  const response = await fetch(ordersBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(placeOrderRequest)
  });
  return response.json();
};
