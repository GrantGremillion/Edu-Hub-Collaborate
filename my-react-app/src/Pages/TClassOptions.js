import * as React from 'react';
// Material UI components
import {Container, Box, Divider, Grid, Button, Typography, TextField} from '@mui/material';
import bg from '../Images/bg.jpg'; // Assuming this is your background image
import Sidebar from '../Components/Sidebar';
import HeaderBox from '../Components/HeaderBox';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';


// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '.././Config';

import { useParams } from 'react-router-dom';


function TClassOptions() {

  const { class_id, announce } = useParams();

  const [Class, setClass] = useState();
  const [ann, setAnn] = useState();

  useEffect(() => {
    axiosInstance.post('/classes/get_current_class', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          const className = res.data.class[0].class_name;
          setClass(className);
        } else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        // Handle error (e.g., set state to display an error message)
      });
  }, [class_id]);
  


  //Navigation clicks for zoom and chat
  const zoomClick = (url) => {
  window.open(url, '_blank');};

  const navigate = useNavigate();
  const Chat = () => {
    navigate(`/ChatInterface/${class_id}`);
  }

  const handleEdit = async (e) => {
    e.preventDefault();
      axiosInstance.post('/Announcements/send', ann)
    }
  
  const handleLeave = () => {
    navigate("/");
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
        <Container maxWidth="sm" style={{ background: containerColor, marginTop: '60px', height: '700px', marginBottom:'60px'}}>
            <Grid container spacing={4}
              direction="column"
              alignItems="center"
              justifyContent="center">

          <Grid item>
          <HeaderBox text={Class} sx={{fontSize: 'Large', fontFamily: 'Courier New', paddingTop: '5%', marginLeft: '5%', color: textColor}}/>
          </Grid>

          <Grid item>
          <Divider
          align="center"
          flexItem 
          style={{ marginTop: '0%', marginLeft: '0%'}}>
          </Divider>
          </Grid>

          <Grid item>
          <Typography align="center" sx={{fontSize: 'Large', fontFamily: 'Courier New', paddingTop: '-10%', color: textColor}}>
           Announcements:
           {TClassOptions.text}
          </Typography>
          </Grid>

          <Grid item>
          <Typography align="center" sx={{fontSize: 'Large', fontFamily: 'Courier New', paddingTop: '-10%', color: textColor}}>
           {ann}
           {TClassOptions.text}
          </Typography>
          </Grid>

          <Divider 
          flexItem 
          style={{ marginTop: '5%', marginLeft: '3%', color: textColor}}>
          </Divider>

          <Grid item xs={2}>
            <Button variant="contained" size="large"  onClick={Chat} style=
            {{ width: '220px', color: textColor, background: buttonColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginLeft: '-65%'}}>
              Class Chat room
            </Button>
          </Grid> 

          <Grid item xs={2}>
            <Button variant="contained" size="large"  onClick={() => zoomClick('https://app.zoom.us/wc/home')}  style=
            {{ width: '220px', color: textColor, background: buttonColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '-61.5%', marginLeft: '65%'}}>
              Zoom Link
            </Button>
          </Grid> 

          <Grid item xs={12}>
              <TextField
                  fullWidth
                  id="otp-input"
                  label="Text"
                  variant="filled"
                  value={ann}
                  onChange={(e) => setAnn(e.target.value)}

              />
          </Grid>

          <Grid item xs={2}>
            <Button variant="contained" size="small"  onClick={handleEdit}  style=
            {{ width: '200px', color: textColor, background: buttonColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '%', marginLeft: '0%'}}>
              Edit Announcements
            </Button>
          </Grid> 

          <Grid item xs={2}>
            <Button variant="contained" size="small"  onClick={handleLeave}  style=
            {{ width: '200px', color: textColor, background: buttonColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '%', marginLeft: '0%'}}>
              Leave Class
            </Button>
          </Grid>
            
          </Grid> 
        </Container>
    </div>
  );
}

export default TClassOptions;