import { OrderItem } from '../../models/OrderItem';

// TODO: add other fields like customer, order date, etc.
export interface PlaceOrderRequest {
  orderItems: OrderItem[];
}

export interface PlaceOrderResponse {
  orderId: string;
  orderItems: OrderItem[];
}
