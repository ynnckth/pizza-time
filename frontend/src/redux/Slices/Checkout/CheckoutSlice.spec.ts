import checkoutReducer, { addOrderItem, initialCheckoutState, placeOrder, removeOrderItem } from './CheckoutSlice';
import { pizzaMargherita, pizzaSalami } from '../../../testUtils/TestData/TestPizzas';
import { RequestStatus } from '../../../utils/RequestStatus';
import { setupStore } from '../../Store';
import * as placeOrderApi from '../../../api/Order/OrderApi';

describe('Checkout reducer', () => {
  it('should handle initial state', () => {
    expect(checkoutReducer(undefined, { type: 'unknown' })).toEqual({
      orderItems: [],
      placeOrderStatus: RequestStatus.IDLE,
      placeOrderError: undefined,
      pastOrders: [],
      fetchPastOrdersError: undefined,
      fetchPastOrdersStatus: RequestStatus.IDLE,
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

  describe('Place order', () => {
    let store: ReturnType<typeof setupStore>;

    beforeEach(() => {
      jest.resetAllMocks();
      store = setupStore();
    });

    it('should place an order and update the store', async () => {
      const sampleOrder = {
        orderId: '1',
        customer: { firstName: 'Peter', lastName: 'Griffin', email: 'peter@griffin.com' },
        orderItems: [pizzaMargherita],
        orderDate: new Date().toDateString(),
      };
      jest.spyOn(placeOrderApi, 'placeOrder').mockResolvedValue(sampleOrder);

      const orderResponse = await store
        .dispatch(
          placeOrder({
            placeOrderRequest: {
              orderDate: new Date().toDateString(),
              orderItems: [pizzaMargherita],
              customer: { firstName: 'Peter', lastName: 'Griffin', email: 'peter@griffin.com' },
            },
            navigate: () => {},
          })
        )
        .unwrap();

      const checkoutState = store.getState().checkout;
      expect(orderResponse).toBe(sampleOrder);
      expect(checkoutState.pastOrders).toHaveLength(1);
      expect(checkoutState.pastOrders).toContain(sampleOrder);
      expect(checkoutState.orderItems).toHaveLength(0);
      expect(checkoutState.placeOrderStatus).toBe(RequestStatus.SUCCESSFUL);
      expect(checkoutState.placeOrderError).toBe(undefined);
    });

    // TODO: check why the returned promise from the dispatch is not rejected (seems to be related to the RtkQueryMiddleware)
    it.skip('should set error state if failed to place order', async () => {
      const errorMessage = 'Failed to place order!';
      jest.spyOn(placeOrderApi, 'placeOrder').mockRejectedValue(errorMessage);

      await expect(
        async () =>
          await store
            .dispatch(
              placeOrder({
                placeOrderRequest: {
                  orderDate: new Date().toDateString(),
                  orderItems: [pizzaMargherita],
                  customer: { firstName: 'Peter', lastName: 'Griffin', email: 'peter@griffin.com' },
                },
                navigate: () => {},
              })
            )
            .unwrap()
      ).rejects.toThrow(errorMessage);

      const checkoutState = store.getState().checkout;
      expect(checkoutState.pastOrders).toHaveLength(0);
      expect(checkoutState.placeOrderStatus).toBe(RequestStatus.FAILED);
      expect(checkoutState.placeOrderError).toBe(errorMessage);
    });
  });
});
