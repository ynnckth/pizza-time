import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header/Header';
import Marketplace from './components/Marketplace/Marketplace';

const App = () => {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Header title={'🍕 Pizza Time!'} />
      <Box sx={{ bgcolor: 'white', height: 'calc(100% - 45px)' }}>
        <Marketplace />
      </Box>
    </Box>
  );
};
export default App;
