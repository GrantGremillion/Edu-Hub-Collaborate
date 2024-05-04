import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'

// Allows us to navigate between web pages
import { useNavigate, useLocation } from 'react-router-dom';

// background images
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';

// dark theme functionality
import * as themes from '.././Config';

// Used to call API's on the backend
import axiosInstance from '../helpers/axios';

function VerifyEmail() {

  // Temporary values to handle the button click redirection
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState('');
  const location = useLocation();
  const email = location.state?.email;
  const password = location.state?.password;
  const [cpassword, setCHP] = React.useState('');
  const [values, setValues] = React.useState({
    email: email,
    password: password,
    cpassword: password
  })

  const handleClickBack = () => {
    // Use navigate to go to the UserProfile page
    navigate('/');
  }

  const handleClickMake = async () => {
    console.log(email);
    console.log(password);
    //Testing
    /*
      if (cpassword === password){
        axios.post('http://localhost:8081/account/create_Saccount', values)
        // testing 
        .then(res => {
          if(res.data.Status === "Success") {
            navigate('/Login')
            //navigate('/VerifyEmail')
          }
          else{
            alert(res.data.Status)
          } 
        })
      } else {
        alert("Password Incorrect");
      }
      */

    // Use navigate to go to the UserProfile page

        if (!otp) {
          alert('Please enter the OTP.');
          console.log(otp)
          return;
        }

        if (cpassword !== password){
          alert('Incorrect Password')
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        const verifyOtpUrl = `${apiUrl}/api/verify-otp`;

        try {
        const response = await fetch(verifyOtpUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        });


        if (response.ok && cpassword === password) {
            const data = await response.json();
            alert(data.message); // "OTP verified successfully."
            axiosInstance.post('/account/create_Saccount', values)
            // testing 
            .then(res => {
              if(res.data.Status === "Success") {
                navigate('/Login')
                //navigate('/VerifyEmail')
              }
              else{
                alert(res.data.Status)
              }
              
            })
        } else {
            const errorData = await response.json();
            console.error('Error verifying OTP:', errorData);
            alert(errorData.error || 'Failed to verify OTP.');
        }
        } catch (error) {
        console.error('Network error when verifying OTP:', error);
        alert('Network error when verifying OTP.');
        }
        };

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
      <Container maxWidth='sm' style={{ background: containerColor, marginTop: '75px', height: '560px', marginBottom:'75px'}} >
        <Grid container spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center">
          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
            <HeaderBox text={'Verify Your Email'}></HeaderBox>
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="Emailed OTP" variant="filled" value={otp} onChange={(e) => setOtp(e.target.value)}
            />
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="Confirm Password" type="password" variant="filled" value={cpassword} onChange={(e) => setCHP(e.target.value)}
            />
          </Grid>
  
          <Grid item xs={1}>
            <Button variant="contained" size="large"  onClick={handleClickMake} style={{ width: '200px', background: buttonColor, color: textColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
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