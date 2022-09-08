import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Central handler for rejected RTK Query actions
 * https://redux-toolkit.js.org/rtk-query/usage/error-handling#handling-errors-at-a-macro-level
 */
export const rtkQueryErrorNotifications: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    // TODO: improve this error handling as we might not always know the structure of the response
    try {
      if (typeof action.payload.data === 'string') {
        toast.error(action.payload.data);
      } else {
        toast.error(action.payload.data.error);
      }
    } catch (e) {
      console.error('Failed to handle rejected query', JSON.stringify(action));
    }
  }
  return next(action);
};
