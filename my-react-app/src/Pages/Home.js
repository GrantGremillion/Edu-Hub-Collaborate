import * as React from 'react';
import {Box, Container, Typography, Divider} from '@mui/material';


// Our own custom-built components 
import HomeNavBar from '../Components/HomeNavBar';

// background images
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
// handles darkmode toggle on the page
import * as themes from '.././Config';


function Home({onLogout}) {


  // checks for the theme the page is in, and applys it to these variables
  if (themes.DARKMODE) {
    var containerColor = themes.darkContainer;
    //var buttonColor = themes.darkButton;
    var textColor = themes.darkText;
    var background = dark_bg;
  }
  else {
    containerColor = themes.normalContainer;
    //buttonColor = themes.normalButton;
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
        position: 'fixed', // Make sure it covers the whole viewport
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        }}>
      </Box>
      <HomeNavBar></HomeNavBar>

      {/* Container that will hold all home page components */}
      <Container fixed>
        <Box sx={{height: '100vh', width: '120%', marginTop: '5%', marginLeft: '-10%', bgcolor: containerColor}} >
          <div style={{ textAlign: 'center'}}>
            <Typography variant='h3' gutterBottom sx={{fontFamily: 'Courier New', paddingTop: '3%', color: textColor}}>
              Notifications
            </Typography>
            
            <Divider></Divider>
            <Typography sx={{fontSize: 'x-large', fontFamily: 'Courier New', paddingTop: '4%', color: textColor}}>
              This area will be used to display any direct messages from friends or announcements from teachers in a class you have joined
            </Typography>
          </div> 
        </Box>
        <Box sx={{height: '100vh', width: '120%', marginTop: '5%', marginLeft: '-10%', bgcolor: containerColor}} />
      </Container>
    </div>
  );
}

export default Home;
  