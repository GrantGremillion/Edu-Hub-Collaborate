import * as React from 'react';
// Material UI components
import { Container, Box, Divider, Grid, Button, Typography, TextField } from '@mui/material';
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
  const navigate = useNavigate();

  const [editAnnounce, setAnnounce] = useState({
    Cid: class_id,
    announcement: ann
  });

  const updateAnn = (value) => {
    setAnn(value);
  }

  useEffect(() => { setAnnounce({ Cid: class_id, announcement: ann }); }, [ann]);

  const handleDeleteClick = (e) => {
    // Prevent default event (e) from occuring
    e.preventDefault();

    // sends an HTTP POST request to the URL login backend API
    axiosInstance.post('/classes/remove_messages', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          console.log("Deleted messages, going to students...");
          axiosInstance.post('/classes/remove_students', { Cid: class_id })
            .then(res => {
              if (res.data.Status === "Success") {
                console.log("Removed students, deleting events...");
                axiosInstance.post('/classes/remove_events', { Cid: class_id })
                  .then(res => {
                    if (res.data.Status === "Success") {
                      console.log("Deleted events, deleting class now...");
                      axiosInstance.post('/classes/remove_class', { Cid: class_id })
                        .then(res => {
                          if (res.data.Status === "Success") {
                            alert("Class successfully deleted!");
                            navigate('/ClassesDisplay')
                          }
                          else {
                            alert(res.data.Message + " error in TClassOptions: error deleting class.");
                          }
                        })
                        .catch(err => console.log(err));
                    }
                    else {
                      alert(res.data.Message + " error in TClassOptions: error deleting events.");
                    }
                  })
                  .catch(err => console.log(err));
              }
              else {
                alert(res.data.Message + " error in TClassOptions: error removing students.");
              }
            })
            .catch(err => console.log(err));
        }
        else {
          alert(res.data.Message + " error in TClassOptions: error deleting messages.");
        }
      })
      .catch(err => console.log(err));
  }

  // when the teacher updates the announcements in a class and presses submit.
  const handleAnnouncementClick = (e) => {
    // Prevent default event (e) from occuring
    e.preventDefault();

    console.log("Edit announce val: " + editAnnounce);

    // sends an HTTP POST request to the URL login backend API
    axiosInstance.post('/Announcements/set', editAnnounce)

      // testing 
      .then(res => {
        if (res.data.Status === "Success") {
          console.log("Successfully edited announcement.");
        }
        else {
          alert(res.data.Message + " error in TClassOptions");
        }
      })
      .catch(err => console.log(err));
  }


  useEffect(() => {
    axiosInstance.post('/classes/get_current_class', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          const className = res.data.class[0].class_name;
          setClass(className);
          setAnn(res.data.class[0].announce);
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
    window.open(url, '_blank');
  };

  const Chat = () => {
    navigate(`/ChatInterface/${class_id}`);
  }

  const GoToCalendar = () => {
    navigate(`/CalendarSchedule/${class_id}`);
  }


  const handleClassNotecardsClick = (e) => {
    e.preventDefault();
    navigate(`/ClassNotecards/${class_id}`);
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

      <Sidebar />

      {/*Container holding buttons and text*/}
      <Container maxWidth="sm" style={{ background: containerColor, marginTop: '60px', height: '900px', marginBottom: '60px' }}>
        <Grid container spacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center">

          <Grid item>
            <HeaderBox text={Class} sx={{ fontSize: 'Large', fontFamily: 'Courier New', paddingTop: '5%', marginLeft: '5%', color: textColor }} />
          </Grid>

          <Grid item>
            <Divider
              align="center"
              flexItem
              style={{ marginTop: '0%', marginLeft: '0%' }}>
            </Divider>
          </Grid>

          <Grid item>
            <Typography align="center" sx={{ fontSize: 'Large', fontFamily: 'Courier New', paddingTop: '-10%', color: textColor }}>
              Announcements:

            </Typography>
          </Grid>

          <Grid item>
            <Typography align="center" sx={{ fontSize: 'Large', fontFamily: 'Courier New', paddingTop: '-10%', color: textColor }}>
              {ann}

            </Typography>
          </Grid>

          <Divider
            flexItem
            style={{ marginTop: '5%', marginLeft: '3%', color: textColor }}>
          </Divider>

          <Grid item xs={2}>
            <Button variant="contained" size="large" onClick={Chat} style=
              {{ width: '220px', color: textColor, background: buttonColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large', marginLeft: '-65%' }}>
              Class Chat room
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button variant="contained" size="large" onClick={() => zoomClick('https://app.zoom.us/wc/home')} style=
              {{ width: '220px', color: textColor, background: buttonColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large', marginTop: '-61.5%', marginLeft: '65%' }}>
              Zoom Link
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button variant="contained" size="large" onClick={handleClassNotecardsClick} style=
              {{ width: '220px', color: textColor, background: buttonColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large', marginLeft: '-65%', marginBottom: '0%' }}>
              Class Notecards
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button variant="contained" size="large" onClick={GoToCalendar} style=
              {{ width: '220px', color: textColor, background: buttonColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large', marginTop: "-61.5%", marginLeft: '65%', marginBottom: '0%' }}>
              Class Calendar
            </Button>
          </Grid>

          <Grid item>
            <TextField
              autoComplete="off"
              fullWidth
              id="otp-input"
              label="Text"
              variant="filled"
              value={ann}
              onChange={(e) => updateAnn(e.target.value)}
            />
          </Grid>

          <Grid item>
            <Button variant="contained" size="small" onClick={handleAnnouncementClick} style=
              {{ width: '200px', color: textColor, background: buttonColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large', marginTop: '%', marginLeft: '0%' }}>
              Edit Announcements
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button variant="contained" size="small" onClick={handleDeleteClick} style=
              {{ width: '200px', color: textColor, background: buttonColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large', marginTop: '%', marginLeft: '0%' }}>
              Leave Class
            </Button>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}

export default TClassOptions;