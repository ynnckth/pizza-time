import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header/Header';
import Marketplace from './components/Marketplace/Marketplace';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Header title={'🍕 Pizza Time!'} />
      <Box sx={{ bgcolor: 'white', height: 'calc(100% - 45px)' }}>
        <Marketplace />
        {/* TODO: add button to go to cart (displaying number of items in cart) */}
        {/* TODO: implement cart page with option to checkout or remove items from it */}
      </Box>
      <Toaster position={'bottom-center'} />
    </Box>
  );
};
export default App;
