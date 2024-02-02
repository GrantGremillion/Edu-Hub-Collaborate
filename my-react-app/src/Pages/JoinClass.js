import * as React from 'react';
// Material UI components
import {Button, Grid, Container, TextField, Box, Divider} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';

import bg from '../Images/bg.jpg'; // Assuming this is your background image
import PlainNavBar from '../Components/PlainNavBar'; // Assuming this is your custom navigation component
import GoBackButton from '../Components/GoBackButton';

// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import {DARKMODE} from '.././Config';

function JoinClass() {

  if (DARKMODE) {
    return (
      <div>
        <PlainNavBar />
    
        <Box
            className="bg"
            style={{
                backgroundImage: `url(${dark_bg})`,
                backgroundSize: "cover",
                zIndex: '-1',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            }}> 
        </Box>
      
        <Container maxWidth="sm" style={{ background: '#216E6B', marginTop: '75px', height: '550px', marginBottom:'75px'}}>
          <Grid container spacing={4}
            direction="column"
            alignItems="center"
            justifyContent="center">
    
            <Grid item>
              <HeaderBox text="Student Classes" />
            </Grid>
    
            <Grid item xs={2}>
              <TextField variant="filled" label="Class ID" />
            </Grid>
    
            <Grid item xs={2}>
              <Button variant="contained" size="large"  onClick={() =>{alert('Would redirect');}} style={{ width: '220px', color: 'black', background: '#009688'}} >
                Join Class
              </Button>
            </Grid>
    
            <Divider 
              orientation="horizontal" 
              flexItem 
              style={{ margin: '5%', width: '50%', marginLeft: '28%', marginBottom: '0%', color: 'black'}}>
                or
            </Divider>
    
            <Grid item xs={2}>
              <Button variant="contained" size="large"  onClick={() =>{alert('Would redirect');}} style={{ width: '220px', color: 'black', background: '#009688'}} >
                View Classes
              </Button>
            </Grid> 
    
            <Grid item xs={12}>
              <GoBackButton />
            </Grid>
    
          </Grid>
        </Container>   
      </div>
    );
  }
  else {
    return (
      <div>
        <PlainNavBar />
    
        <Box
            className="bg"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                zIndex: '-1',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            }}> 
        </Box>
      
        <Container maxWidth="sm" style={{ background: '#e0f2f1', marginTop: '75px', height: '550px', marginBottom:'75px'}}>
          <Grid container spacing={4}
            direction="column"
            alignItems="center"
            justifyContent="center">
    
            <Grid item>
              <HeaderBox text="Student Classes" />
            </Grid>
    
            <Grid item xs={2}>
              <TextField variant="filled" label="Class ID" />
            </Grid>
    
            <Grid item xs={2}>
              <Button variant="contained" size="large"  onClick={() =>{alert('Would redirect');}} style={{ width: '220px', color: 'black', background: '#b2dfdb'}} >
                Join Class
              </Button>
            </Grid>
    
            <Divider 
              orientation="horizontal" 
              flexItem 
              style={{ margin: '5%', width: '50%', marginLeft: '28%', marginBottom: '0%', color: 'black'}}>
                or
            </Divider>
    
            <Grid item xs={2}>
              <Button variant="contained" size="large"  onClick={() =>{alert('Would redirect');}} style={{ width: '220px', color: 'black', background: '#b2dfdb'}} >
                View Classes
              </Button>
            </Grid> 
    
            <Grid item xs={12}>
              <GoBackButton />
            </Grid>
    
          </Grid>
        </Container>   
      </div>
    );
  }
}

export default JoinClass;