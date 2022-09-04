import { OrderItem } from '../../../models/OrderItem';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Store';
import { PlaceOrderRequest, PlaceOrderResponse } from '../../../api/Order/PlaceOrderDto';
import { fetchPastOrders, placeOrder as placeOrderApi } from '../../../api/Order/OrderApi';
import { RequestStatus } from '../../../utils/RequestStatus';

export interface CheckoutState {
  orderItems: OrderItem[];
  placeOrderStatus: RequestStatus;
  placeOrderError?: string;
  pastOrders: PlaceOrderResponse[];
  fetchPastOrdersStatus: RequestStatus;
  fetchPastOrdersError?: string;
}

export const initialCheckoutState: CheckoutState = {
  orderItems: [],
  placeOrderStatus: RequestStatus.IDLE,
  placeOrderError: undefined,
  pastOrders: [],
  fetchPastOrdersStatus: RequestStatus.IDLE,
  fetchPastOrdersError: undefined,
};

// TODO (high): explore RTK Query data fetching API as an alternative to writing thunks for data fetching
export const placeOrder = createAsyncThunk('checkout/placeOrder', async (placeOrderRequest: PlaceOrderRequest) => {
  return placeOrderApi(placeOrderRequest);
});

export const getPastOrders = createAsyncThunk('checkout/getPastOrders', async () => {
  return fetchPastOrders();
});

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialCheckoutState,
  reducers: {
    addOrderItem: (state, action: PayloadAction<OrderItem>) => {
      state.orderItems.push(action.payload);
    },
    removeOrderItem: (state, action: PayloadAction<OrderItem>) => {
      const filtered = state.orderItems.filter((orderItem) => orderItem.name === action.payload.name);
      filtered.pop();
      state.orderItems = [
        ...state.orderItems.filter((orderItem) => orderItem.name !== action.payload.name),
        ...filtered,
      ];
    },
  },
  // Provides methods that let us define additional case reducers that will run in response to actions defined outside the slice
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.placeOrderStatus = RequestStatus.LOADING;
        state.placeOrderError = undefined;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placeOrderStatus = RequestStatus.SUCCESSFUL;
        state.pastOrders.push(action.payload);
        state.orderItems = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placeOrderStatus = RequestStatus.FAILED;
        state.placeOrderError = action.error.message;
      })

      .addCase(getPastOrders.pending, (state) => {
        state.pastOrders = [];
        state.fetchPastOrdersStatus = RequestStatus.LOADING;
        state.fetchPastOrdersError = undefined;
      })
      .addCase(getPastOrders.fulfilled, (state, action) => {
        state.fetchPastOrdersStatus = RequestStatus.SUCCESSFUL;
        state.pastOrders.push(...action.payload);
      })
      .addCase(getPastOrders.rejected, (state, action) => {
        state.fetchPastOrdersStatus = RequestStatus.FAILED;
        state.fetchPastOrdersError = action.error.message;
      });
  },
});

export const { addOrderItem, removeOrderItem } = checkoutSlice.actions;

export const selectOrderItems = (state: RootState) => state.checkout.orderItems;
export const selectPastOrders = (state: RootState) => state.checkout.pastOrders;
export const selectPlaceOrderStatus = (state: RootState) => state.checkout.placeOrderStatus;
export const selectPlaceOrderError = (state: RootState) => state.checkout.placeOrderError;
export const selectFetchPastOrdersStatus = (state: RootState) => state.checkout.fetchPastOrdersStatus;
export const selectFetchPastOrdersError = (state: RootState) => state.checkout.fetchPastOrdersError;

export default checkoutSlice.reducer;
