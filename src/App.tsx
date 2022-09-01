import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header/Header';
import Marketplace from './pages/Marketplace/Marketplace';
import { Navigate, Route, Routes } from 'react-router-dom';
import Checkout from './pages/Checkout/Checkout';
import OrderHistory from './pages/OrderHistory/OrderHistory';

const App = () => {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Header title={'🍕 Pizza Time!'} />
      <Box sx={{ bgcolor: 'white', height: 'calc(100% - 45px)' }}>
        <Routes>
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="*" element={<Navigate replace to="/marketplace" />} />
        </Routes>
      </Box>
    </Box>
  );
};
export default App;
