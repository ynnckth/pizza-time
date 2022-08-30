import React from 'react';
import { Box, Typography } from '@mui/material';

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
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Typography variant={'h5'}>{title}</Typography>
    </Box>
  );
};
export default Header;
