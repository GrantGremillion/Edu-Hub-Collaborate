import * as React from 'react';
// Material UI components, similar to CreateAccount.js
import {Button, Grid, Container, Box, TextField, InputAdornment, IconButton} from '@mui/material';
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
// Used to make http requests from the browser
import axios from 'axios'

// used to handle user toggled dark mode
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '.././Config';



function Login({onLogin}) {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

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
    // sends an HTTP POST request to the URL login backend API
    axios.post('http://localhost:8081/account/login', credentials)

    // testing 
    .then(res => {
      console.log(res.data);
      if(res.data.Status === "Success") {
        onLogin({ account: res.data.Account, userID: res.data.ID });
        navigate('/Home')
      }
      else{
        setLoginFailed(true);
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

      <Container maxWidth="sm" style={{ background: containerColor, marginTop: '75px', height: '725px', marginBottom:'75px'}} >
        <Grid container spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center">

          <Grid item xs={1} style={{ marginTop: '20px', marginBottom: '20px'}}>
            <HeaderBox text={'Login to your account'}></HeaderBox>
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="College Email" variant="filled" 
            onChange={e => setCredentials({...credentials,email:e.target.value})}/>
          </Grid>


          <Grid item xs={1}>
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
                sx={{ width: '87%', marginLeft: '6%' }}
              />
            ) : (
              <div>
                <TextField
                  id="filled-basic"
                  label="Password"
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
                  sx={{ width: '87%', marginLeft: '6%' }}
                />
                {/* Empty placeholder to take into account error message pushing down components */}
                <div style={{ height: '23px'}} />
              </div>
            )}
          </Grid>

          <Grid item xs={1}>
            <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick} style={{ width: '200px', background: buttonColor, color: textColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '25%'}} >
              Login
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: buttonColor, color: textColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '25%', marginLeft: '-30%'}} >
              Back
            </Button>
            <Button fullWidth color="secondary" size="small" onClick={handleForgotPasswordClick} sx={{ width: '235px', marginTop: '-15%', marginLeft: '70%'}}>
              Forgot password?
            </Button>
          </Grid>
          
        </Grid>
      </Container>
    </div>

  );

}

export default Login;
