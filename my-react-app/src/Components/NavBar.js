import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// ButtonAppBar provided by material ui
export default function ButtonAppBar({text}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: 'Courier New' }} style={{background:'#009688'}}>
            {text}
          </Typography>
      </AppBar>
    </Box>
  );
}