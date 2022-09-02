// TODO (low): add other fields like customer, order date, etc.
import {OrderItem} from './OrderItem';

export interface PlaceOrderRequest {
  orderItems: OrderItem[];
}

export interface PlaceOrderResponse {
  orderId: string;
  orderItems: OrderItem[];
}
