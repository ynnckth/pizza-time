import { OrderItem } from '../../models/OrderItem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface CheckoutState {
  orderItems: OrderItem[];
}

export const initialCheckoutState: CheckoutState = {
  orderItems: [],
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialCheckoutState,
  reducers: {
    addOrderItem: (state, action: PayloadAction<OrderItem>) => {
      state.orderItems.push(action.payload);
    },
    // TODO: removeOrderItem
  },
});

export const { addOrderItem } = checkoutSlice.actions;

export const selectOrderItems = (state: RootState) => state.checkout.orderItems;

export default checkoutSlice.reducer;
