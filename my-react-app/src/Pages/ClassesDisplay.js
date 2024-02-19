import * as React from 'react';
import {Button, Grid, Container, TextField, Box} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'; 

// theme components
import bg from '../Images/bg.jpg'; 
import dark_bg from '../Images/dark_bg.jpg';
import * as themes from '.././Config';

function ClassesDisplay() {

    // checks for the theme the page is in, and applys it to these variables
    if (themes.DARKMODE) {
      var containerColor = themes.darkContainer;
      var buttonColor = themes.darkButton;
      var textColor = themes.darkText;
      var background = dark_bg;
    }
    else {
      var containerColor = themes.normalContainer;
      var buttonColor = themes.normalButton;
      var textColor = themes.normalText;
      var background = bg;
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
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            }}
        ></Box>
  
        <Container style={{ background: containerColor, marginTop: '75px', height: '700px', width: '1000px', marginBottom:'75px'}}>
          <Grid container spacing={4}
            direction="column"
            alignItems="center"
            justifyContent="center">
  
            
  
          </Grid>
        </Container>
      </div>
    );
  }
  
  export default ClassesDisplay;