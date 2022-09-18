import React from 'react';
import { Box, Typography } from '@mui/material';
import { TestId } from '../../testUtils/TestId';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '45px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box />
      <Typography variant={'h5'} data-testid={TestId.APP_TITLE}>
        {title}
      </Typography>
      <Box />
    </Box>
  );
};
export default Header;
