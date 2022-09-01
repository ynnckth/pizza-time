import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PreloadedState } from '@reduxjs/toolkit';
import { AppStore, RootState, setupStore } from '../redux/Store';
import { Provider } from 'react-redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

/**
 * Wraps the react-testing-library render function with other required providers
 * like the redux store provider and a browser router.
 * @param component
 * @param preloadedState
 * @param store
 * @param renderOptions
 * For more information on testing with redux see:
 * https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
 */
export const renderWithProviders = (
  component: React.ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
    renderOptions
  );
};
