import * as React from 'react';
// Material UI components
import {Container, Box, Divider, Grid, Button, Typography, TextField, ButtonBase, Card, CardContent} from '@mui/material';
import bg from '../Images/bg.jpg'; // Assuming this is your background image
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';


// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '../Config';

import { useParams } from 'react-router-dom';



function ClassNotecards() {

  const { class_id } = useParams();

  const navigate = useNavigate();

  const handleAddNotecardSetClick = (e) => {
    e.preventDefault();
    navigate(`/CreateNotecards/${class_id}`);
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

  useEffect(() => {
        
    // Get all notecard sets
    axiosInstance.post('/notecards/get_sets', {Cid: class_id})
 
      .then(res => {
          if(res.data.Status === "Success") {
            console.log(res.data.Sets);
              
          }
          else{
              alert('Failed');
          }  
      })
    
  }, []);

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

        <Sidebar/>

        {/*Container holding buttons and text*/}
        <Container style={{ background: containerColor, marginTop: '5%', height: '900px', width: '1100px', marginBottom:'60px'}}>
            <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">

                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                    <ButtonBase onClick={handleAddNotecardSetClick} style={{marginTop: '20%'}}>
                        <Card variant="outlined" style={{ backgroundColor: buttonColor, width: 'fit-content', zIndex:0}}>
                            <CardContent >
                                <Typography fontFamily="Courier New" fontSize={25} >
                                Add A Notecard Set +
                                </Typography>
                            </CardContent>
                        </Card>
                    </ButtonBase>
                </Grid>

        
            </Grid> 
        </Container>
    </div>
  );
}

export default ClassNotecards;