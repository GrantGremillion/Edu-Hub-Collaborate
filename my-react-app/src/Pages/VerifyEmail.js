import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField} from '@mui/material';

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

function VerifyEmail() {

  // Temporary values to handle the button click redirection
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    cpassword: ''
  })

  const handleClickBack = () => {
    // Use navigate to go to the UserProfile page
    navigate('/');
  }

  //Darkmode Theme
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
        <Box
            className="bg"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                zIndex: '-1',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            }}
        >
        </Box>

      <PlainNavBar text='Edu Hub Collaborate'></PlainNavBar >

      {/* Container and Grid organizes HeaderBox and Buttons */}
      <Container maxWidth='sm' style={{ background: containerColor, marginTop: '75px', height: '480px', marginBottom:'75px'}} >
        <Grid container spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center">
          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
            <HeaderBox text={'Verify Your Email'}></HeaderBox>
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="OTP" variant="filled" 
            />
          </Grid>
  
          <Grid item xs={1}>
            <Button variant="contained" size="large"  onClick={null} style={{ width: '200px', background: buttonColor, color: textColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
              Verify
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: buttonColor, color: textColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '3%', marginLeft: '-220%'}} >
              Back
            </Button>
          </Grid>
        
        </Grid>
      </Container>
      
    </div>
  );
}

export default VerifyEmail;