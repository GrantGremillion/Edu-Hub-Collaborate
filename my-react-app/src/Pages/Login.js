import * as React from 'react';
// Material UI components, similar to CreateAccount.js
import {Button, Grid, Container, Box, TextField} from '@mui/material';

// Importing custom components as used in CreateAccount.js
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'; 

// Using the same navigation functionality
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

// Assuming the use of the same background image
import bg from '.././Images/bg.jpg';
// Used to make http requests from the browser
import axios from 'axios'

// used to handle user toggled dark mode
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '.././Config';

import {useCookies} from "react-cookie";

function Login({onLogin}) {

  const [cookies, setCookie] = useCookies(["user","account"]);

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  // Navigation handler
  const navigate = useNavigate();

  // Handler for login button click
  // e = event object
  const handleLoginClick = (e) => {

    // Prevent default event (e) from occuring
    e.preventDefault();
    // sends an HTTP POST request to the URL login backend API
    axios.post('http://localhost:8081/login', values)

    // testing 
    .then(res => {
      if(res.data.Status === "Success") {
        if(res.data.Account === "Student"){
          setCookie('account', 'student', { path: '/' });
        }
        else{
          setCookie('account', 'teacher', { path: '/' });
        }
        onLogin();
        navigate('/Home')
      }
      else{
        alert(res.data.Message)
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

      <Container maxWidth="sm" style={{ background: containerColor, marginTop: '75px', height: '700px', marginBottom:'75px'}} >
        <Grid container spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center">

          <Grid item xs={1} style={{ marginTop: '20px', marginBottom: '20px'}}>
            <HeaderBox text={'Login to your account'}></HeaderBox>
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="College Email" variant="filled" 
            onChange={e => setValues({...values,email:e.target.value})}/>
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="Password" variant="filled" type="password"
            onChange={e => setValues({...values,password:e.target.value})}/>
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
