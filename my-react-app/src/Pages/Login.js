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
import {DARKMODE} from '.././Config';

function Login({onLogin}) {

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
        onLogin(values);
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

  if (DARKMODE) {
    return (
      <div>
        <PlainNavBar />
        <Box
          className="bg"
          style={{
          backgroundImage: `url(${dark_bg})`,
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

        <Container maxWidth="sm" style={{ background: '#216E6B', marginTop: '75px', height: '700px', marginBottom:'75px'}} >
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
              <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick} style={{ width: '200px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '25%'}} >
                Login
              </Button>
            </Grid>

            <Grid item xs={1}>
              <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '25%', marginLeft: '-30%'}} >
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
  else {
    return (
      <div>
        <PlainNavBar />
        <Box
          className="bg"
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

        <Container maxWidth="sm" style={{ background: '#e0f2f1', marginTop: '75px', height: '700px', marginBottom:'75px'}} >
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
              <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick} style={{ width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '25%'}} >
                Login
              </Button>
            </Grid>

            <Grid item xs={1}>
              <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '25%', marginLeft: '-30%'}} >
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
}

export default Login;
