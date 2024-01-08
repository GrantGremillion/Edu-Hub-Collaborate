import * as React from 'react';
import {Button, Grid} from '@mui/material';
import HeaderBox from '.././Components/HeaderBox';

// Allows us to navigate between pages
import { useNavigate } from 'react-router-dom';

function AccountSelection() {
  
  const navigate = useNavigate();

  const handleClick = () => {
    // Use navigate to go to the UserProfile page
    navigate('/UserProfile');
  }

  return (
    <div className="AccountSelection">
        <Grid container spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center">
          <Grid item xs={1}>
            <HeaderBox text = "Edu Collaborate">
            </HeaderBox>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" size="large"  onClick={handleClick} style={{ width: '200px' }} >
              Student
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" size="large"  onClick={handleClick} style={{ width: '200px' }} >
              Teacher
            </Button>
          </Grid>
        </Grid>
  
    </div>
    );
  }

  
  export default AccountSelection;
  