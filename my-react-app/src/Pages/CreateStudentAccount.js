import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField, Link} from '@mui/material';

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

// Used to call API's on the backend
import axios from 'axios';

function CreateStudentAccount() {
  
  // Temporary values to handle the button click redirection
  const navigate = useNavigate();

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

  // Handler for Submit button click
  const handleClickSubmit = async (e) => {
    // Prevent default event (e) from occuring
    e.preventDefault();
    if ((email && password) != null && password.length > 5){
        try {
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
                console.log(email);
            }
        } catch (error) {
            alert("Invalid Email");
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
      {/* Box used to display background image - bg.jpg */}
      <Box
        className="bg"
        style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        zIndex: '-1',
        position: 'fixed', // Make sure it covers the whole viewport
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        }}>
      </Box>

      <PlainNavBar text='Edu Hub Collaborate'></PlainNavBar >
      
      {/* Container and Grid organizes HeaderBox and Buttons */}
      <Container maxWidth='sm' style={{ background: containerColor, marginTop: '75px', height: '700px', marginBottom:'75px'}} >
        <Grid container spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center">
          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
            <HeaderBox text={'Create your student account'}></HeaderBox>
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="Email" variant="filled" value={email}
            onChange={e => setEmail(e.target.value)}/>            
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="Password" variant="filled" type="password"
            onChange={e => setPassword(e.target.value)}/>

          </Grid>
  
          <Grid item xs={1}>
            <Button variant="contained" size="large"  onClick={handleClickSubmit} style={{ width: '200px', background: buttonColor, color: textColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '15%'}} >
              Submit
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: buttonColor, color: textColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '3%', marginLeft: '-30%'}} >
              Back
            </Button>
            <Button fullWidth color="secondary" size="small" onClick={handleLoginClick} sx={{ width: '235px', marginTop: '-20%', marginLeft: '65%'}}>
              Already have an account?
            </Button>
          </Grid>
        
        </Grid>
      </Container>
    </div>
  );
}

export default CreateStudentAccount;
  