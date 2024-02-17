import React from 'react';
import Box from '@mui/material/Box';
import {Outlet} from 'react-router-dom';
import {Typography} from '@mui/material';

const Layout = () => {
  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Quiz Maker
      </Typography>
      <Outlet/>
    </Box>
  );
};

export default Layout;
