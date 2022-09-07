import { OrderItem } from '../../../generated';

export const calculateTotalOrderPrice = (orderItems: OrderItem[]) =>
  orderItems.map((item) => item.unitPrice).reduce((sum, i) => sum + i, 0);
