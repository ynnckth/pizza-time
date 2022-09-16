import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../Store';

export interface NavigationState {
  selectedTabIndex: number;
}

export const initialNavigationState: NavigationState = {
  selectedTabIndex: 0,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialNavigationState,
  reducers: {
    setSelectedTabIndex: (state, action) => {
      state.selectedTabIndex = action.payload;
    },
  },
});

export const { setSelectedTabIndex } = navigationSlice.actions;

export const selectSelectedTabIndex = (state: RootState) => state.navigation.selectedTabIndex;

export default navigationSlice.reducer;
