import * as React from 'react';
// Material UI components
import {Container, Box, Divider, Grid, Button, Typography} from '@mui/material';
import bg from '../Images/bg.jpg'; // Assuming this is your background image
import Sidebar from '../Components/Sidebar';
import HeaderBox from '../Components/HeaderBox';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';


// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '.././Config';

import { useParams } from 'react-router-dom';


function SClassOptions() {

  const { class_id } = useParams();

  const [Class, setClass] = useState();
  const [announcement, setAnnouncement] = useState();

  const [cookies] = useCookies(['userID']);

  const [leave, setLeave] = useState({
    Cid: class_id,
    Sid: cookies.userID
  });

  useEffect(() => {

    axiosInstance.post('/classes/get_current_class', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          const className = res.data.class[0].class_name;
          setClass(className);
          setAnnouncement(res.data.class[0].announce);
        } else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        // Handle error (e.g., set state to display an error message)
      });
  }, [class_id]);
  

  const handleLeaveClick = (e) => {

    // Prevent default event (e) from occuring
    e.preventDefault();
    
    // sends an HTTP POST request to the URL login backend API
    axiosInstance.post('/classes/leave_class', leave)

    // testing 
    .then(res => {
      if(res.data.Status === "Success") {
        navigate('/ClassesDisplay')
      }
      else{
        alert(res.data.Message + " error in SClassOptions");
      }
    })
    .catch(err => console.log(err));
  }



  //Navigation clicks for zoom and chat
  const zoomClick = (url) => {
  window.open(url, '_blank');};

  const navigate = useNavigate();
  const Chat = () => {
    navigate(`/ChatInterface/${class_id}`);
  }

  const handleClassNotecardsClick = (e) => {
    e.preventDefault();
    navigate(`/ClassNotecards/${class_id}`);
  }

  const GoToCalendar = () => {
    navigate(`/CalendarSchedule/${class_id}`);
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
          </Typography>
          </Grid>

          <Grid item>
          <Typography align="center" sx={{fontSize: 'Large', fontFamily: 'Courier New', paddingTop: '-10%', color: textColor}}>
           {announcement}
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

          <Grid item xs={2}>
            <Button variant="contained" size="large"  onClick={handleClassNotecardsClick} style=
            {{ width: '220px', color: textColor, background: buttonColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginLeft: '-65%', marginBottom: '0%'}}>
              Class Notecards
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button variant="contained" size="large"  onClick={GoToCalendar} style=
            {{ width: '220px', color: textColor, background: buttonColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: "-61.5%", marginLeft: '65%', marginBottom: '0%'}}>
              Class Calendar
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button variant="contained" size="small"  onClick={handleLeaveClick}  style=
            {{ width: '200px', color: textColor, background: buttonColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginLeft: '0%'}}>
              Leave Class
            </Button>
          </Grid>

          </Grid> 
        </Container>
    </div>
  );
}

export default SClassOptions;