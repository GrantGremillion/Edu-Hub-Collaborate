import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// ButtonAppBar provided by material ui
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{background:'#009688'}}>
            Welcome To Edu Collaborate
          </Typography>
      </AppBar>
    </Box>
  );
}