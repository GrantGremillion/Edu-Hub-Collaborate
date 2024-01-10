
import * as React from 'react';
// Material UI components, similar to CreateAccount.js
import {Button, Grid, Container, Box, TextField} from '@mui/material';

// Importing custom components as used in CreateAccount.js
import HeaderBox from '.././Components/HeaderBox';
import NavBar from '.././Components/NavBar'; 

// Using the same navigation functionality
import { useNavigate } from 'react-router-dom';

// Assuming the use of the same background image
import bg from '.././Images/bg.jpg';

function Login() {
  
  // Navigation handler, similar to CreateAccount.js
  const navigate = useNavigate();

  // Handler for login button click, similar structure to the account creation process
  const handleLoginClick = () => {
    // Logic to authenticate user (to be implemented)
    navigate('/UserProfile'); // Navigating to user profile after successful login
  }

  // Handler for forgot password click, a feature not in CreateAccount.js but necessary for login
  const handleForgotPasswordClick = () => {
    navigate('/RecoverPassword');
  }

  return (
    <div>
       <NavBar />
      <Box
        class="bg"
        style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        zIndex: '-1',
        position: 'fixed',
        top: 0,
        left: 0,
        rigth: 0,
        buttom: 0,
        width: '100%',
        height: '100%'
        }}
      ></Box>

        <NavBar text='Edu Hub Collaborate'></NavBar>


      <Container maxWidth="sm" style={{ background: '#e0f2f1', marginTop: '75px', height: '700px', marginBottom:'75px'}} >
        <Grid container spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center">
          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
            <HeaderBox text={'Login to your account'}></HeaderBox>
          </Grid>
          <Grid item xs={1}>
            <TextField id="filled-basic" label="College Email" variant="filled" />
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="Password" variant="filled" type="password"/>
          </Grid>

          
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick} style={{ width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '25%'}} >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth color="secondary" onClick={handleForgotPasswordClick}>
              Forgot Password?
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Login;
