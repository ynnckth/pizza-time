import React from 'react';
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction } from '@mui/material';
import { LocalPizza, ShoppingCart, Toc } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Page } from '../../Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { selectSelectedTabIndex, setSelectedTabIndex } from '../../redux/Slices/Navigation/NavigationSlice';
import { TestId } from '../../testUtils/TestId';

const BottomNavigation = () => {
  const dispatch = useAppDispatch();
  const selectedTabIndex = useAppSelector(selectSelectedTabIndex);

  return (
    <MuiBottomNavigation
      sx={{ position: 'fixed', bottom: 0, width: '100%' }}
      showLabels
      value={selectedTabIndex}
      onChange={(event, newSelectedTabIndex) => dispatch(setSelectedTabIndex(newSelectedTabIndex))}
    >
      <BottomNavigationAction
        label="Marketplace"
        icon={<LocalPizza />}
        component={Link}
        to={Page.MARKETPLACE}
        data-testid={TestId.BOTTOM_NAVIGATION_MARKETPLACE}
      />
      <BottomNavigationAction
        label="Checkout"
        icon={<ShoppingCart />}
        component={Link}
        to={Page.CHECKOUT}
        data-testid={TestId.BOTTOM_NAVIGATION_CHECKOUT}
      />
      <BottomNavigationAction
        label="Past orders"
        icon={<Toc />}
        component={Link}
        to={Page.PAST_ORDERS}
        data-testid={TestId.BOTTOM_NAVIGATION_PAST_ORDERS}
      />
    </MuiBottomNavigation>
  );
};
export default BottomNavigation;
