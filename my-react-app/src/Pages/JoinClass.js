import React, { useState } from 'react';
import { Button, Grid, Container, TextField, Box, Typography, useMediaQuery, useTheme, Divider } from '@mui/material';
import GoBackButton from '../Components/GoBackButton';
import bg from '../Images/bg.jpg'; 
import dark_bg from '../Images/dark_bg.jpg';
import * as themes from '../Config';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Sidebar from '../Components/Sidebar';
import axiosInstance from '../helpers/axios';

function JoinClass() {
  const [cookies] = useCookies(['userID']);
  const [key, setKey] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickClasses = () => {
      navigate("/ClassesDisplay")
  };

  const handleClickJoinClass = (e) => {
    e.preventDefault();

    axiosInstance.post('/classes/join_class', { key: key, Sid: cookies.userID })
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/ClassesDisplay');
        } else {
          console.log("Failed");
        }
      })
      .catch(err => console.log(err));
  }

  // Theme conditional style
  const containerStyles = {
    background: themes.DARKMODE ? themes.darkContainer : themes.normalContainer, 
    marginTop: '75px', 
    padding: isSmallScreen ? theme.spacing(2) : theme.spacing(4),
    boxShadow: theme.shadows[5], // use theme's shadow
    borderRadius: theme.shape.borderRadius, // use theme's border radius
    maxWidth: '100%', // avoid overflow on small screens
    mx: 'auto' // center Container on the screen
  };

  const headerBoxStyles = {
    width: '100%', // full width
    textAlign: 'center', // center the text
    backgroundColor: themes.darkButton, // Use the green color from your themes
    color: '#ffffff', // Assuming white text
    padding: theme.spacing(1), // Adjust the padding
    fontWeight: 'bold', // Make the font bold
    fontSize: isSmallScreen ? '1.5rem' : '2rem', // Adjust font size larger, responsive to screen size
    borderRadius: theme.shape.borderRadius, // optional: if you want rounded corners
    boxShadow: theme.shadows[1], // optional: if you want some shadow effect
    margin: theme.spacing(1), // Add some space around the green box
  };
  

  const textFieldStyles = {
    width: '100%', // full width
    // add more styling as per your TextField component's requirements
  };

  const buttonColor = themes.DARKMODE ? themes.darkButton : themes.normalButton;
  const textColor = themes.DARKMODE ? themes.darkText : themes.normalText;
  const background = themes.DARKMODE ? dark_bg : bg;

  return (
    <div>
      <Sidebar />
      <Box
        className="bg"
        sx={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          zIndex: -1,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%'
        }}> 
      </Box>
    
      <Container sx={containerStyles}>
        <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography sx={headerBoxStyles}>Student Classes</Typography>
          </Grid>
  
          <Grid item xs={12}>
            <TextField sx={textFieldStyles} variant="filled" label="Access Key" onChange={e => setKey(e.target.value)} />
          </Grid>
  
          <Grid item xs={12}>
            <Button 
              fullWidth
              variant="contained" 
              size="large"
              onClick={handleClickJoinClass} 
              sx={{
                color: textColor, 
                background: buttonColor,
                '&:hover': {
                  background: theme.palette.action.hover
                },
              }}
            >
              Join Class
            </Button>
          </Grid>
  
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>or</Divider>
          </Grid>
  
          <Grid item xs={12}>
            <Button 
              fullWidth
              variant="contained" 
              size="large"
              onClick={handleClickClasses} 
              sx={{
                color: textColor, 
                background: buttonColor,
                '&:hover': {
                  background: theme.palette.action.hover
                },
              }}
            >
              View Classes
            </Button>
          </Grid> 
  
          <Grid item xs={12}>
            <GoBackButton />
          </Grid>
  
        </Grid>
      </Container>   
    </div>
  );
}

export default JoinClass;
