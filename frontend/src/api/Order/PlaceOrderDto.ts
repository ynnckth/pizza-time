import { OrderItem } from '../../models/OrderItem';
import { Customer } from '../../models/Customer';

export interface PlaceOrderRequest {
  orderItems: OrderItem[];
  customer: Customer;
  orderDate: string;
}

export interface PlaceOrderResponse {
  orderId: string;
  orderItems: OrderItem[];
  customer: Customer;
  orderDate: string;
}
