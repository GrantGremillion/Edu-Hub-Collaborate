import logo from './logo.svg';
import HeaderBox from './Components/HeaderBox';
import * as React from 'react';
import {Button, Grid} from '@mui/material';


function App() {
  return (
    <div className="App">

        <Grid container spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center">
          <Grid item xs={1}>
            <HeaderBox>
            </HeaderBox>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" size="large"  onClick={() => {alert('clicked');}} style={{ width: '200px' }} >
              Student
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" size="large"  onClick={() => {alert('clicked');}} style={{ width: '200px' }} >
              Teacher
            </Button>
          </Grid>
        </Grid>
  


    </div>
  );
}

export default App;
