import React, { useState } from 'react';
// Material UI components
import { Button, Grid, Container, Box, TextField, Typography, useTheme } from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'

// Allows us to navigate between web pages
import { useNavigate } from 'react-router-dom';

// background images
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
import bg_img_left from '.././Images/bg_img_left.jpg'

// dark theme functionality
import * as themes from '.././Config';

function CreateStudentAccount() {

  // Temporary values to handle the button click redirection
  const navigate = useNavigate();
  const theme = useTheme();

  const customGreenColor = '#009688';

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
    if ((email && password) != null && password.length > 5) {
      try {
        console.log("Server Backend IP" + process.env.REACT_APP_API_URL);
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
          alert("Please ensure that your email is a valid .edu email");
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
      p: theme.spacing(2),
      textAlign: 'center',
      color: 'white',
      backgroundColor: customGreenColor,
      width: 'fit-content',
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",

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

      <Grid container direction="row" alignItems="center"
        justifyContent="center">
        <Grid item sx={{mt: '5%'}}>
          <img src={bg_img_left} alt="bubbles" />
        </Grid>
        <Grid item sx={{ marginTop: '5%', width: '50%' }}>
          <Container maxWidth='sm' style={{ background: styleProps.containerColor, height: '650px', marginBottom: '75px' }} >
            <Grid container spacing={5}
              direction="column"
              alignItems="center"
              justifyContent="center">

              <Grid item xs={12} style={{ marginTop: '5%', marginBottom: '5%' }}>
                <HeaderBox text={'Create Student Account'}></HeaderBox>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  label="Email / Username"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleTextFieldFocus}
                  onBlur={handleTextFieldBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleClickSubmit}
                  style={{ width: '200px', background: styleProps.buttonColor, color: styleProps.textColor }}
                  sx={{ fontFamily: 'Courier New', fontSize: 'large', }}>
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleClickBack}
                  style={{ width: '100px', background: styleProps.buttonColor, color: styleProps.textColor }}
                  sx={{ fontFamily: 'Courier New', fontSize: 'large', }}>
                  Back
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleLoginClick}
                  color='secondary'
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}>
                  Already have an account?
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>

        <Grid item sx={{mt: '5%'}}>
          <img src={bg_img_left} alt="bubbles" />
        </Grid>

      </Grid>
    </div>
  );
}

export default CreateStudentAccount;