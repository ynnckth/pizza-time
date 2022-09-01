import { OrderItem } from '../../models/OrderItem';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { PlaceOrderRequest, PlaceOrderResponse } from '../../api/Checkout/PlaceOrderDto';
import { placeOrder as placeOrderApi } from '../../api/Checkout/CheckoutApi';

export interface CheckoutState {
  orderItems: OrderItem[];
  placeOrderStatus: 'idle' | 'loading' | 'successful' | 'failed';
  placeOrderError?: string;
  pastOrders: PlaceOrderResponse[];
}

export const initialCheckoutState: CheckoutState = {
  orderItems: [],
  placeOrderStatus: 'idle',
  placeOrderError: undefined,
  pastOrders: [],
};

// TODO: explore RTK Query data fetching API as an alternative to writing thunks for data fetching
export const placeOrder = createAsyncThunk('checkout/placeOrder', async (placeOrderRequest: PlaceOrderRequest) => {
  return placeOrderApi(placeOrderRequest);
});

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialCheckoutState,
  reducers: {
    addOrderItem: (state, action: PayloadAction<OrderItem>) => {
      state.orderItems.push(action.payload);
    },
    // TODO (low): implement reducer for removeOrderItem
  },
  // Provides methods that let us define additional case reducers that will run in response to actions defined outside of the slice
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.placeOrderStatus = 'loading';
        state.placeOrderError = undefined;
        console.log('Placing order ...');
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placeOrderStatus = 'successful';
        state.pastOrders.push(action.payload);
        state.orderItems = [];
        console.log('Placed order successfully', action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placeOrderStatus = 'failed';
        state.placeOrderError = action.error.message;
        console.error('Failed to place order: ', action.error.message);
      });
  },
});

export const { addOrderItem } = checkoutSlice.actions;

export const selectOrderItems = (state: RootState) => state.checkout.orderItems;
export const selectPastOrders = (state: RootState) => state.checkout.pastOrders;
export const selectPlaceOrderStatus = (state: RootState) => state.checkout.placeOrderStatus;
export const selectPlaceOrderError = (state: RootState) => state.checkout.placeOrderError;

export default checkoutSlice.reducer;
