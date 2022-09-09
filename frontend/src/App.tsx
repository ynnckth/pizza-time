import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header/Header';
import Marketplace from './pages/Marketplace/Marketplace';
import { Navigate, Route, Routes } from 'react-router-dom';
import Checkout from './pages/Checkout/Checkout';
import PastOrders from './pages/PastOrders/PastOrders';

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
      <Box sx={{ bgcolor: 'white', height: 'calc(100% - 45px)' }}>
        <Routes>
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<PastOrders />} />
          <Route path="*" element={<Navigate replace to="/marketplace" />} />
        </Routes>
      </Box>
    </Box>
  );
};
export default App;
