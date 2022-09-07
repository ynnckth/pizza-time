import { OrderItem } from '../../../codegen/generated';

export const calculateTotalOrderPrice = (orderItems: OrderItem[]) =>
  orderItems.map((item) => item.unitPrice).reduce((sum, i) => sum + i, 0);
