import * as React from 'react';
import {Button, Grid, Container, TextField, Box, Card, Typography, ButtonBase, Divider} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'; 
import GenerateKey from '../Components/GenerateKey'; 

import CardContent from '@mui/material/CardContent';

// theme components
import bg from '../Images/bg.jpg'; 
import dark_bg from '../Images/dark_bg.jpg';
import * as themes from '.././Config';

function ClassesDisplay() {

  const handleClickClass = (e) => {
    e.preventDefault();
    
    console.log("Class Button");
    return
  }

  const handleClickGenerateKey = (e) => {
    // Make sure the parent button is not clicked as well (class button)
    e.stopPropagation();
  
    // Generates a random alphanumeric key that is ten characters long
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    console.log(result);
  }

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
            >

            <Grid item xs={12} style={{}}>
              <ButtonBase sx={{marginRight:'60%', marginLeft:'5%'}} onClick={handleClickClass}>
                <Card >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Math101
                    </Typography>

                    <Divider orientation="horizontal" flexItem style={{ margin: '5%', width: '50%', marginLeft: '28%', marginBottom: '0%', color: textColor}} ></Divider>

                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      This is an introductory math class for freshmen at Louisiana Tech
                    </Typography>
                    
                    <Button size="large" onClick={handleClickGenerateKey}>Generate a key for students</Button>

                    

                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>

          </Grid>
        </Container>
      </div>
    );
  }
  
  export default ClassesDisplay;