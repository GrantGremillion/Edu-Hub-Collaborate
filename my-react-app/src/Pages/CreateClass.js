import * as React from 'react';
// Material UI components
import {Button, Grid, TextField} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';

function CreateClass() {

return (
  <div>

      <Grid container spacing={4}
        direction="column"
        alignItems="center"
        justifyContent="center">
        <Grid item>
          <HeaderBox text="Create A Class" />

        </Grid>
        <Grid item xs={2}>
          <TextField variant="filled" label="Class Name" />

        </Grid>
        <Grid item xs={2}>
          <TextField variant="filled" label="Class Description" />

        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" size="large"  onClick={() =>{alert('Would redirect');}} style={{ width: '220px'}} >
            Confirm Class
          </Button>

        </Grid> 

      </Grid>
  </div>
  );
}

export default CreateClass;
  