import themeReducer, { initialThemeState, toggleTheme } from './ThemeSlice';

describe('Theme reducer', () => {
  it('should handle initial state', () => {
    const state = themeReducer(initialThemeState, toggleTheme());
    expect(state).toEqual({ isDarkTheme: true });
  });

  it('should toggle theme state', () => {
    const state = themeReducer(initialThemeState, toggleTheme());
    expect(state.isDarkTheme).toBe(true);

    const updatedState = themeReducer(state, toggleTheme());
    expect(updatedState.isDarkTheme).toBe(false);
  });
});
