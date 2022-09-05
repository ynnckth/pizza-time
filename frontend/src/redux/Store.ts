import { Action, combineReducers, configureStore, PreloadedState, ThunkAction } from '@reduxjs/toolkit';
import { checkoutSlice } from './Slices/Checkout/CheckoutSlice';
import { themeSlice } from './Slices/Theme/ThemeSlice';
import { marketplaceApi } from './Slices/Marketplace/MarketplaceSlice';

const rootReducer = combineReducers({
  checkout: checkoutSlice.reducer,
  theme: themeSlice.reducer,
  [marketplaceApi.reducerPath]: marketplaceApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marketplaceApi.middleware),
  });
};

export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {checkout: CheckoutState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
