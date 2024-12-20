
import * as React from 'react';
// Material UI components
import { Button, Grid, Container, Box, Divider, Typography } from '@mui/material';

// Our own custom-built components 
import HeaderBox from '.././Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'

// Allows us to navigate between web pages
import { useNavigate } from 'react-router-dom';

// background images
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
import pencil from '.././Images/pencil.png';
import paper from '.././Images/paper.png';
import bg_img_left from '.././Images/bg_img_left.jpg'


// theme toggle components
import * as themes from '.././Config';

function AccountSelection() {

  // Temporary values to handle the button click redirection
  const navigate = useNavigate();
  const handleStudentClick = () => {
    // Use navigate to go to the student account creation page
    navigate('/CreateStudentAccount');
  }
  const handleTeacherClick = () => {
    // Use navigate to go to the teacher account creation page
    navigate('/CreateTeacherAccount');
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

      <Grid container direction="row" alignItems="center"
        justifyContent="center">
        <Grid item sx={{mt: '5%'}}>
          <img src={bg_img_left} alt="bubbles" />
        </Grid>
        <Grid item sx={{ marginTop: '5%', width: '50%' }}>
          {/* Container and Grid organizes HeaderBox and Buttons */}
          <Container maxWidth='sm' style={{ background: containerColor, height: 'fit-content', marginBottom: '75px' }} >
            <Grid container spacing={5}
              direction="column"
              alignItems="center"
              justifyContent="center">

              <Grid item xs={12} style={{ marginTop: '5%', marginBottom: '2%' }}>
                <HeaderBox text={'Select your account type'}></HeaderBox>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Box style={{ width: '50%', background: buttonColor}}>
                  <Typography sx={{fontFamily: 'Courier New', fontSize: 'medium', textAlign: 'center'}}> If you are on the website for viewing/testing purposes, please start by creating a teacher account with a username</Typography>
                </Box>
              </Grid>


              <Grid item xs={1}>
                <Button variant="contained" size="large" onClick={handleStudentClick} style={{ width: '200px', background: buttonColor, color: textColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large' }} >
                  Student
                </Button>
              </Grid>

              <Divider orientation="horizontal" flexItem style={{ margin: '5%', width: '50%', marginLeft: '27%', marginBottom: '-2%', color: textColor }} >or</Divider>

              <Grid item xs={1}>
                <Button variant="contained" size="large" onClick={handleTeacherClick} style={{ width: '200px', background: buttonColor, color: textColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large' }} >
                  Teacher
                </Button>
              </Grid>

              <Grid item xs={1}>
                <img src={pencil} alt="pencil" style={{ marginLeft: '70%', width: '30%' }} />

                <img src={paper} alt="paper" style={{ marginTop: '-80%', marginLeft: '-5%', width: '40%' }} />
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

export default AccountSelection;
