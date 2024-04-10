import * as React from 'react';
// Material UI components
import {Container, Box, Divider, Grid, Button, Typography, TextField, ButtonBase, Card, CardContent} from '@mui/material';
import NoteCardTemplate from '../Components/NoteCardTemplate';
import bg from '../Images/bg.jpg'; // Assuming this is your background image
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';


// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '../Config';

import { useParams } from 'react-router-dom';


function CreateNotecards() {

  const { class_id, announce } = useParams();

  const [Class, setClass] = useState();
  const [ann, setAnn] = useState();
  const navigate = useNavigate();



  const handleAddNotecardSetClick = (e) => {
    e.preventDefault();
    navigate('/CreateNotecards');
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

        <Sidebar/>

        {/*Container holding buttons and text*/}
        <Container style={{ background: containerColor, marginTop: '5%', height: '900px', width: '1100px', marginBottom:'60px'}}>
            <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">

                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }} >
                    <Box fontFamily="Courier New" fontSize={20} sx={{ pt: '4%'}}>Notecard Set Name: </Box>
                    <TextField></TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                    <NoteCardTemplate></NoteCardTemplate>
                </Grid>

        
            </Grid> 
        </Container>
    </div>
  );
}

export default CreateNotecards;