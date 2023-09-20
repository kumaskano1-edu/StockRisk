import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



function LoadingComponent() {
  return (
    <Box sx={{ display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh' }}>
    <CircularProgress size={80}/>
    </Box>
  );
}

export default LoadingComponent;
