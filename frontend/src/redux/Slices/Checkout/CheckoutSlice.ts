import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Store';
import { fetchPastOrders, placeOrder as placeOrderApi } from '../../../api/Order/OrderApi';
import { RequestStatus } from '../../../utils/RequestStatus';
import { Order, OrderItem, PlaceOrderRequest } from '../../../../generated';
import { setSelectedTabIndex } from '../Navigation/NavigationSlice';
import { getTabIndexForPage, Page } from '../../../Navigation';
import { toast } from 'react-toastify';
import { PLACE_ORDER_SUCCESS_MESSAGE } from '../../../pages/Checkout/Checkout';
import { NavigateFunction } from 'react-router/lib/hooks';

export interface CheckoutState {
  orderItems: OrderItem[];
  placeOrderStatus: RequestStatus;
  placeOrderError?: string;
  pastOrders: Order[];
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

interface PlaceOrderAction {
  placeOrderRequest: PlaceOrderRequest;
  navigate: NavigateFunction;
}

// TODO: check how this thunk could be replaced with a RTK Query mutation
export const placeOrder = createAsyncThunk(
  'checkout/placeOrder',
  async (placeOrderAction: PlaceOrderAction, thunkAPI) => {
    thunkAPI.dispatch(setSelectedTabIndex(getTabIndexForPage(Page.PAST_ORDERS)));
    try {
      const response = await placeOrderApi(placeOrderAction.placeOrderRequest);
      placeOrderAction.navigate(Page.PAST_ORDERS);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: check if it would simplify things to use RTK Query instead of this thunk
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
        state.pastOrders.push(action.payload!);
        state.orderItems = [];
        toast.success(PLACE_ORDER_SUCCESS_MESSAGE);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placeOrderStatus = RequestStatus.FAILED;
        state.placeOrderError = action.error.message;
        toast.error(action.error.message);
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
