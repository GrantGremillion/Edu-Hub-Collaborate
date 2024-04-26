import React, { useState } from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField, Typography, useTheme} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'

// Allows us to navigate between web pages
import { useNavigate } from 'react-router-dom';

// background images
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';

// dark theme functionality
import * as themes from '.././Config';
import { Paper } from '@mui/material';


function CreateStudentAccount() {
  
  // Temporary values to handle the button click redirection
  const navigate = useNavigate();
  const theme = useTheme();

  const customGreenColor = '#009688';

  /*
  const [values, setValues] = React.useState({
    cpassword: ''
  })*/
          // <Grid item xs={1}>
          // <TextField id="filled-basic" label="Confirm password" variant="filled" type="password" 
          //  onChange={e => setValues({...values,cpassword:e.target.value})}/>
          //</Grid>

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
 
  const fullScreenCenterStyle = {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', // This centers vertically
    alignItems: 'center', // This centers horizontally
    height: '100vh', // Full viewport height
    width: '100vw', // Full viewport width
    position: 'absolute',
    top: 0,
    left: 0
  };

  // Handler for Submit button click
  const handleClickSubmit = async (e) => {
    // Prevent default event (e) from occuring
    e.preventDefault();
    if ((email && password) != null && password.length > 5){
        try {
            console.log(process.env.REACT_APP_API_URL);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // "OTP sent successfully."
                navigate('/VerifyEmail', { state: { email, password } }); // Navigate to OTP verification page
            } else {
                throw new Error(data.error || 'Failed to send OTP.');
            }
        } catch (error) {
            console.log(error);
        }
      }
     else {
      alert("Please enter a valid email/a password of at least 6 characters.")
    }
  }

  const handleClickBack = () => {
    // Use navigate to go to the UserProfile page
    navigate('/');
  }
  const handleLoginClick = () => {
    // Use navigate to go to the UserProfile page
    navigate('/Login');
  }

  
  const styleProps = {
    containerColor: themes.DARKMODE ? themes.darkContainer : themes.normalContainer,
    buttonColor: themes.DARKMODE ? themes.darkButton : themes.normalButton,
    textColor: themes.DARKMODE ? themes.darkText : themes.normalText,
    background: themes.DARKMODE ? dark_bg : bg,
    navbarColor: customGreenColor,
    paperStyle: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: 'white',
      backgroundColor: customGreenColor,
      width: '100%', 
    },
  };
  const handleTextFieldFocus = (event) => {
    event.target.style.background = '#fff'; 
  };

  
  const handleTextFieldBlur = (event) => {
    event.target.style.background = ''; 
  };

  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${styleProps.background})`,
          backgroundSize: 'cover',
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <PlainNavBar text='Edu Hub Collaborate' />
      <Container maxWidth="sm" sx={{
        background: styleProps.containerColor,
        boxShadow: theme.shadows[5],
        borderRadius: theme.shape.borderRadius,
        p: 3, 
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
      }}>
      <Grid container spacing={6} justifyContent="center" alignItems="center" style={{ width: '100%' }}>
        <Grid item xs={12}>
          <Paper sx={styleProps.paperStyle} >
          <Typography variant="h5" component="h2" fontSize={37} fontFamily={'Courier New'}>
                Create your student account
              </Typography>
          </Paper>
        </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleTextFieldFocus}
              onBlur={handleTextFieldBlur}
              sx={{
                backgroundColor: '#fff', 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                backgroundColor: '#fff', 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleClickSubmit}
              sx={{
                background: styleProps.buttonColor,
                color: styleProps.textColor,
                '&:hover': {
                  backgroundColor: '#5e92f3',
                },
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              onClick={handleClickBack}
              sx={{
                background: styleProps.buttonColor,
                color: styleProps.textColor,
                '&:hover': {
                  backgroundColor: '#5e92f3', 
                },
              }}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="text"
              size="small"
              onClick={handleLoginClick}
              sx={{
                color: styleProps.textColor,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              Already have an account?
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CreateStudentAccount;