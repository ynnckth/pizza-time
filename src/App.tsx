import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Box sx={{ width: '100vw' }}>
      <Header title={'🍕 Pizza Time!'} />
      <Box sx={{ bgcolor: 'white', height: '100vh' }} />
    </Box>
  );
};
export default App;
