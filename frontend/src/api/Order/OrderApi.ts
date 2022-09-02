import {PlaceOrderRequest, PlaceOrderResponse} from './PlaceOrderDto';

const baseUrl = '/api/orders';

export const fetchPastOrders = async (): Promise<PlaceOrderResponse[]> => {
  const response = await fetch(baseUrl);
  return response.json();
};

export const placeOrder = async (placeOrderRequest: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(placeOrderRequest)
  });
  return response.json();
};
