import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { TestId } from '../../testUtils/TestId';

interface Props {
  loadingText?: string;
}

const LoadingSpinner: React.FC<Props> = ({ loadingText }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      data-testid={TestId.LOADING_SPINNER}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ marginBottom: '20px' }} />
        {loadingText && <Typography>{loadingText}</Typography>}
      </Box>
    </Box>
  );
};
export default LoadingSpinner;
