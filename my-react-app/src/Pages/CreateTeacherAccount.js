import React, { useState } from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField, Typography, Divider} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'

// Allows us to navigate between web pages
import { useNavigate } from 'react-router-dom';

// background image
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';

// dark theme functionality
import * as themes from '.././Config';

// Used to call API's on the backend
import axiosInstance from '../helpers/axios';

function CreateTeacherAccount() {
  
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    cpassword: ''
  });

  const [file, setFile] = React.useState();

  // Handler for Submit button click
  const handleClickSubmit = (e) => {

    // Prevent default event (e) from occuring
    e.preventDefault();

    // if the user does not upload their file to prove they are a teacher
    if(handleFormSubmit() === false){
      alert("Please select a file")
      return;
    }

    // sends an HTTP POST request to the URL login backend API
    axiosInstance.post('/account/create_Taccount', values)

    // testing 
    .then(res => {
      if(res.data.Status === "Success") {
        navigate('/Login')
        
      }
      else{
        alert(res.data.Status)
      }  
    })
  }

  const handleFormSubmit = () => {
    const formData = new FormData()
    formData.append("image", file)
      // check that the user has selected a file
      if(file){

        axiosInstance.post('/upload/uploadFile', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        return true
      }

      return false
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

  const styleProps = {
    containerColor: themes.DARKMODE ? themes.darkContainer : themes.normalContainer,
    buttonColor: themes.DARKMODE ? themes.darkButton : themes.normalButton,
    textColor: themes.DARKMODE ? themes.darkText : themes.normalText,
    background: themes.DARKMODE ? dark_bg : bg,
    navbarColor: '#009688',
    paperStyle: {
      p: 2,
      textAlign: 'center',
      color: 'white',
      backgroundColor: '#009688',
      width: '100%', // Adjusted for full width
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    buttonSx: { 
      bgcolor: buttonColor,
      '&:hover': {
        bgcolor: '#5e92f3',
      },
      color: textColor,
    },
    textButtonSx: {
      color: textColor,
      '&:hover': {
        bgcolor: 'transparent',
      },
    }
  };

  
  return (
    <Box sx={{
      backgroundImage: `url(${styleProps.background})`,
      backgroundSize: 'cover',
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
    }}>
      <PlainNavBar text='Edu Hub Collaborate' />
      <Container maxWidth="sm" sx={{
        background: styleProps.containerColor,
        boxShadow: 3,
        borderRadius: 2,
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        display: 'flex',
        p: 3, // padding for smaller screens
      }}>
        <Typography variant="h5" component="h2" sx={styleProps.paperStyle}>
          Create your teacher account
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          label="Email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          sx={{
            backgroundColor: '#fff',
            mb: 2,
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Password"
          type="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          sx={{
            backgroundColor: '#fff',
            mb: 2,
          }}
        />

        <TextField
          fullWidth
          variant="filled"
          label="Confirm Password"
          type="password"
          value={values.cpassword}
          onChange={(e) => setValues({ ...values, cpassword: e.target.value })}
          sx={{
            backgroundColor: '#fff',
            mb: 2,
          }}
        />

        {/* Incorporate the upload option */}
        <Grid item xs={12} md={6}>
          <Box component="section" sx={{ p: 1, mt: 3, border: '2px solid grey', textAlign: 'center' }}>
            <Typography align='center'>
              Please designate a document as evidence of your status as an educator
            </Typography>
            <Divider sx={{ my: 2 }} />
            <input
              filename={file}
              onChange={e => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
              style={{ display: 'block', margin: 'auto' }}
            />
          </Box>
        </Grid>
        


        <Box sx={{ width: '100%', mt: 3 }}>
          {/* TextField and Button components remain the same */}
        </Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleClickSubmit} sx={styleProps.buttonSx}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleClickBack} sx={styleProps.buttonSx}>
              Back
            </Button>
          </Grid>
          <Grid container spacing={2} justifyContent="center"></Grid>
          <Grid item xs={12}>
            <Typography variant="body2" onClick={handleLoginClick} sx={{ ...styleProps.textButtonSx, textAlign: 'center', width: '100%', mt: 2 }}>
              Already have an account?
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CreateTeacherAccount;