import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../Store';

export interface ThemeState {
  isDarkTheme: boolean;
}

export const initialThemeState: ThemeState = {
  isDarkTheme: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectIsDarkTheme = (state: RootState) => state.theme.isDarkTheme;

export default themeSlice.reducer;
