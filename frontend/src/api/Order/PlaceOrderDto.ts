import { Customer, OrderItem } from '../../../../codegen/generated';

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
