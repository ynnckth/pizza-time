import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { checkoutSlice } from './Slices/CheckoutSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  checkout: checkoutSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    preloadedState,
  });
};

export const store = setupStore();

// TODO: Enable saga middleware
// sagaMiddleware.run(saga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {checkout: CheckoutState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
