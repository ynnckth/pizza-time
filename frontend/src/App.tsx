import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Marketplace from './pages/Marketplace/Marketplace';
import Checkout from './pages/Checkout/Checkout';
import PastOrders from './pages/PastOrders/PastOrders';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';

const App = () => {
  useEffect(() => {
    console.group('Version Information');
    console.log('Build version: ', process.env.REACT_APP_BUILD_VERSION);
    console.log('Commit hash: ', process.env.REACT_APP_COMMIT_HASH);
    console.groupEnd();
  }, []);

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Header title={'🍕 Pizza Time!'} />
      <Box sx={{ bgcolor: 'white', minHeight: 'calc(100% - 45px)' }}>
        <Routes>
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<PastOrders />} />
          <Route path="*" element={<Navigate replace to="/marketplace" />} />
        </Routes>
      </Box>
      <BottomNavigation />
    </Box>
  );
};
export default App;
