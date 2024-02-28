import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function PlainNavBar() {


  return (
    <AppBar position="static" sx={{background:'#009688'}}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              mr: 8,
              fontFamily: 'Corier New',
              fontSize: '200%',
              letterSpacing: '.2rem',
              '@media (max-width: 1920px)': {
                marginLeft: '-12%'
              },
              '@media (max-width: 1600px)': {
                marginLeft: '0%'
              },
            }}
          >
            Edu Hub Collaborate
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default PlainNavBar;