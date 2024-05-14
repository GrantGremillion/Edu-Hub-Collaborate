import * as React from 'react';
// Material UI components, similar to CreateAccount.js
import { Button, Grid, Container, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// Importing custom components as used in CreateAccount.js
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar';

// Using the same navigation functionality
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Assuming the use of the same background image
import bg from '.././Images/bg.jpg';
import bg_img_left from '.././Images/bg_img_left.jpg'

// Used to make http requests from the browser
import axiosInstance from '../helpers/axios';

// used to handle user toggled dark mode
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '.././Config';

import { useCookies } from "react-cookie";



function Login({ onLogin }) {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [cookies, setCookie] = useCookies(["userID", "account", "email"]);

  const [LoginFailed, setLoginFailed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Navigation handler
  const navigate = useNavigate();

  // Handler for login button click
  // e = event object
  const handleLoginClick = (e) => {

    // Prevent default event (e) from occuring
    e.preventDefault();

    const URL = process.env.REACT_APP_API_URL;
    // sends an HTTP POST request to the URL login backend API
    axiosInstance.post('/account/login', credentials)

      // testing 
      .then(res => {
        if (res.data.Status === "Success") {
          setCookie('email', credentials.email, { path: '/' });
          onLogin({ account: res.data.Account, userID: res.data.ID, email: res.data.email });
          navigate('/Home')
        }
        else {

          if (res.data.Status === "No Account") {
            setLoginFailed(true);
          }
          else {
            alert(res.data.Message);
          }
        }
      })
      .catch(err => console.log(err));
  }

  const handleClickBack = () => {
    // Use navigate to go to the UserProfile page
    navigate('/');
  }
  // Handler for forgot password click, a feature not in CreateAccount.js but necessary for login
  const handleForgotPasswordClick = () => {
    navigate('/RecoverPassword');
  }

  // checks for the theme the page is in, and applys it to these variables
  if (themes.DARKMODE) {
    var containerColor = themes.darkContainer;
    var buttonColor = themes.darkButton;
    var textColor = themes.darkText;
    var background = dark_bg;
  }
  else {
    containerColor = themes.normalContainer;
    buttonColor = themes.normalButton;
    textColor = themes.normalText;
    background = bg;
  }

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: containerColor,
    paddingTop: '35px',
    paddingBottom: '35px',
    marginTop: '10vh', // This will ensure the box is a bit centered vertically. Adjust as needed.
    boxShadow: 3, // Optional shadow for a "lifted" look
    borderRadius: 3, // Optional border radius for rounded corners
    position: 'relative', // Ensure it's above the background
    zIndex: 2, // Higher than the background image's zIndex
    marginTop: '3%'
  };

  return (

    <div>
      <PlainNavBar />
      <Box
        className="bg"
        style={{
          backgroundImage: `url(${background})`,
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

      <Grid container direction="row" alignItems="center"
        justifyContent="center">
        <Grid item sx={{mt: '5%'}}>
          <img src={bg_img_left} alt="bubbles" />
        </Grid>
        <Grid item sx={{ marginTop: '5%', width: '50%' }}>
          <Container maxWidth='sm' style={{ background: containerColor, height: '650px', marginBottom: '75px' }} >
            <Grid container spacing={5}
              direction="column"
              alignItems="center"
              justifyContent="center">

              <Grid item xs={12} style={{ marginTop: '5%', marginBottom: '5%' }}>
                <HeaderBox text={'Login to your account'} sx={{ width: '100%' }} />
              </Grid>
              <Grid item xs={12} >
                <TextField label="College Email" variant="filled" fullWidth autoComplete="email"
                  onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
              </Grid>

              <Grid item xs={12} >
                {LoginFailed ? ( // Check if the login attempt failed
                  <TextField
                    error
                    id="outlined-error-helper-text"
                    helperText="Incorrect password"
                    variant="filled"
                    type={showPassword ? 'text' : 'password'}
                    onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <div>
                    <TextField
                      label="Password"
                      variant="filled"
                      type={showPassword ? 'text' : 'password'}
                      onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    />
                  </div>
                )}
              </Grid>

              <Grid item xs={1} >
                <Button variant="contained" color="primary" onClick={handleLoginClick}
                  style={{ width: '200px', background: buttonColor, color: textColor }}
                  sx={{ fontFamily: 'Courier New', fontSize: 'large' }} >
                  Login
                </Button>
              </Grid>

              <Grid item xs={1} alignContent="center" alignItems="center" justifyContent="center" display="flex">
                <Button variant="contained" size="small" onClick={handleClickBack}
                  style={{ width: '100px', background: buttonColor, color: textColor }}
                  sx={{ fontFamily: 'Courier New', fontSize: 'large', }} >
                  Back
                </Button>
              </Grid>

              <Grid item xs={1} alignContent="center" alignItems="center" justifyContent="center" display="flex">
                <Button fullWidth color="secondary" size="small" onClick={handleForgotPasswordClick} sx={{ width: '235px', }}>
                  Forgot password?
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

export default Login;
