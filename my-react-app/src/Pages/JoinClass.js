import * as React from 'react';
// Material UI components
import {Button, Grid, TextField} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';
import LabelBox from '.././Components/LabelBox';

function JoinClass() {

return (
  <div>


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
          <Button variant="contained" size="large"  onClick={() =>{alert('Would redirect');}} style={{ width: '220px'}} >
            Join Class
          </Button>

        </Grid>
        <Grid item>
          <LabelBox text="⬇Your Classes⬇" />

        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" size="large"  onClick={() =>{alert('Would redirect');}} style={{ width: '220px'}} >
            View Classes
          </Button>

        </Grid> 

      </Grid>
  </div>
  );
}

export default JoinClass;