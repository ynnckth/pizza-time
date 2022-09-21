import { Order } from '../../../generated';
import { pizzaMargherita, pizzaSalami } from './TestPizzas';

export const samplePastOrders: Order[] = [
  {
    orderId: '0001',
    orderItems: [pizzaMargherita, pizzaSalami],
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
    },
    orderDate: '2022-09-04T07:58:49.098Z',
  },
  {
    orderId: '0002',
    orderItems: [pizzaMargherita],
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
    },
    orderDate: '2022-09-04T07:58:49.098Z',
  },
];
