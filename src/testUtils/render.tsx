import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Wraps the react-testing-library render function with other required providers
 * @param component
 * @param options
 */
export const render = (component: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
  return rtlRender(<BrowserRouter>{component}</BrowserRouter>, options);
};
