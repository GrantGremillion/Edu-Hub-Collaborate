import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ehc from '.././Images/EHC.png';

import {Container} from '@mui/material';

function PlainNavBar() {

  return (
    <AppBar position="static" sx={{background:'#009688'}}>
      <Container maxWidth="xl">
        <Toolbar>
          <img src={ehc} alt="logo" style={{width: '5%', marginLeft: '-2%', marginRight: '1%'}} />
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Corier New',
              fontSize: '125%',
              letterSpacing: '.2rem',
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