import React from 'react';
import { Box, Switch, Typography } from '@mui/material';
import { useAppDispatch } from '../../redux/Hooks';
import { toggleTheme } from '../../redux/Slices/Theme/ThemeSlice';
import { TestId } from '../../testUtils/TestId';

interface Props {
  title: string;
}

// TODO: implement theming (currently only state handling is implemented)
const Header: React.FC<Props> = ({ title }) => {
  const dispatch = useAppDispatch();

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
      <Switch onChange={() => dispatch(toggleTheme())} defaultChecked />
    </Box>
  );
};
export default Header;
