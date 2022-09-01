import checkoutReducer, { addOrderItem, initialCheckoutState, removeOrderItem } from './CheckoutSlice';
import { pizzaMargherita, pizzaSalami } from '../../testUtils/TestPizzas';

describe('Checkout reducer', () => {
  it('should handle initial state', () => {
    expect(checkoutReducer(undefined, { type: 'unknown' })).toEqual({
      orderItems: [],
      placeOrderStatus: 'idle',
      placeOrderError: undefined,
      pastOrders: [],
    });
  });

  it('should add order item for empty order items', () => {
    const state = checkoutReducer(initialCheckoutState, addOrderItem(pizzaMargherita));
    expect(state.orderItems.length).toBe(1);
    expect(state.orderItems).toContainEqual(pizzaMargherita);
  });

  it('should add order item given existing items', () => {
    const state = checkoutReducer(
      { ...initialCheckoutState, orderItems: [pizzaMargherita] },
      addOrderItem(pizzaSalami)
    );
    expect(state.orderItems.length).toBe(2);
    expect(state.orderItems).toContainEqual(pizzaMargherita);
    expect(state.orderItems).toContainEqual(pizzaSalami);
  });

  it('should remove unique order item', () => {
    const state = checkoutReducer(
      { ...initialCheckoutState, orderItems: [pizzaMargherita] },
      removeOrderItem(pizzaMargherita)
    );
    expect(state.orderItems.length).toBe(0);
  });

  it('should remove duplicate order item', () => {
    const state = checkoutReducer(
      { ...initialCheckoutState, orderItems: [pizzaMargherita, pizzaMargherita] },
      removeOrderItem(pizzaMargherita)
    );
    expect(state.orderItems.length).toBe(1);
    expect(state.orderItems).toContainEqual(pizzaMargherita);
  });
});
