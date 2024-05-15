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
import HeaderBox from '../Components/HeaderBox';

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
        }

        else if (res.data.Status === "Class not found") {
          alert("Invalid Access Key");
        }

        else if (res.data.Status === "Server Side Error") {
          alert("Already In Class");
        }

        else {
          console.log("Failed");
        }
      })
      .catch(err => console.log(err));
  }

  // Theme conditional style
  const containerStyles = {
    position: 'relative',
    marginTop: '3%',
    marginBottom: '3%',
    height: 'fit-content',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2em 1em', // Use em units for padding for scalability
    // Responsive design adjustments
    '@media (min-width:600px)': {
      padding: '2em 3em', // Larger padding for larger screens
    },
    background: themes.DARKMODE ? themes.darkContainer : themes.normalContainer,
    boxShadow: 'none',
    borderRadius: theme.shape.borderRadius,
    width: "fit-content"

  };


  const textFieldStyles = {
    width: '100%', // full width
    // add more styling as per your TextField component's requirements
    marginBottom: "10%"
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

      <Container container sx={containerStyles}>

        <Grid item xs={12} style={{marginBottom: '10%'}}>
          <HeaderBox text={'Join Class'} ></HeaderBox>
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
              fontFamily: "Courier New"
            }}
          >
            Join Class
          </Button>
        </Grid>

        <Grid item xs={12} marginRight="3%" p="3%">
          <Divider orientation="horizontal" flexItem style={{ width: '50%', color: textColor, }} >or</Divider>
        </Grid>

        <Grid item xs={12} marginLeft="0%" >
          <Button
            variant="contained"
            size="large"
            onClick={handleClickClasses}
            sx={{
              color: textColor,
              background: buttonColor,
              '&:hover': {
                background: theme.palette.action.hover
              },
              fontFamily: "Courier New"
            }}
          >
            View Classes
          </Button>
        </Grid>

        <Grid item xs={12} marginLeft="1%" >
          <GoBackButton />
        </Grid>

      </Container>
    </div>
  );
}

export default JoinClass;
