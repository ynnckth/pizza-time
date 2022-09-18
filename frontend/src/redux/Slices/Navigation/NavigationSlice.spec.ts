import navigationReducer, { initialNavigationState, NavigationState, setSelectedTabIndex } from './NavigationSlice';

describe('Navigation reducer', () => {
  it('should handle initial state', () => {
    const state: NavigationState = navigationReducer(initialNavigationState, setSelectedTabIndex(0));
    expect(state).toEqual({ selectedTabIndex: 0 });
  });

  it('should change selected tab index', () => {
    const state = navigationReducer(initialNavigationState, setSelectedTabIndex(1));
    expect(state.selectedTabIndex).toBe(1);

    const updatedState = navigationReducer(state, setSelectedTabIndex(2));
    expect(updatedState.selectedTabIndex).toBe(2);
  });
});
