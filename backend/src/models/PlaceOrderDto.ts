// TODO (low): add other fields like customer, order date, etc.
import { OrderItem } from "./OrderItem";
import { Customer } from "./Customer";

export interface PlaceOrderRequest {
  orderItems: OrderItem[];
}

export interface PlaceOrderResponse {
  orderId: string;
  orderItems: OrderItem[];
  customer: Customer;
  orderDate: string;
}
