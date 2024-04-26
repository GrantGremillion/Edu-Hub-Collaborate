import * as React from 'react';
import {Container, Box, Divider, Grid, Button, Typography, TextField, ButtonBase, Card, CardContent} from '@mui/material';
import {useCookies } from "react-cookie";
import { useState, useEffect } from 'react';

// Our own custom-built components 
import HomeNavBar from '../Components/HomeNavBar';

// background images
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
// handles darkmode toggle on the page
import * as themes from '.././Config';

import axiosInstance from '../helpers/axios';



function Home({onLogout}) {

  const [cookies] = useCookies(['userID','account']);
  const [classes, setClasses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

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



  useEffect(() => {

    // If user is a teacher classes need to be fetched differently on the backend 
    if(cookies.account === 'teacher'){
      axiosInstance.post('/classes/get_teacher_classes', { Tid: cookies.userID })
      .then(res => {
        if (res.data.Status === "Success") {

          // Store all class names an announcments in state variables
          const classesArray = [];
          const announcementsArray = [];
          res.data.classes.forEach(obj => {
            console.log(obj);
            const keys = Object.keys(obj);
            
              classesArray.push(obj[keys[1]]);
              announcementsArray.push(obj[keys[4]]);
            
          })

          setAnnouncements(announcementsArray);
          setClasses(classesArray);
        } else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
      return
    }

    else{
      axiosInstance.post('/classes/get_student_classes', { Sid: cookies.userID })
        .then(res => {
          if (res.data.Status === "Success") {
            // Store all class names an announcments in state variables
          const classesArray = [];
          const announcementsArray = [];
          res.data.classes.forEach(obj => {
            console.log(obj);
            const keys = Object.keys(obj);
            
              classesArray.push(obj[keys[1]]);
              announcementsArray.push(obj[keys[4]]);
            
          })

          setAnnouncements(announcementsArray);
          setClasses(classesArray);
          } else {
            alert(res.data.Status);
          }
        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });
    }
  }, [cookies]);

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

      
      <HomeNavBar/>

      {/* Container that will hold all home page components */}
      <Container fixed>
        <Box sx={{height: '100vh', width: '100%', marginTop: '5%', bgcolor: containerColor}} >
          <div style={{ textAlign: 'center'}}>
            <Typography variant='h3' gutterBottom sx={{fontFamily: 'Courier New', paddingTop: '3%', color: textColor}}>
              Notifications
            </Typography>
            
            <Divider></Divider>
            <Typography sx={{fontSize: 'x-large', fontFamily: 'Courier New', paddingTop: '4%', color: textColor}}>
            

              

                {/*Mapping each of the notecard sets retrieved from the backend to be displayed on cards*/}
                {announcements.map((ann, index) => (

               

                  <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
                      <Card variant="outlined" style={{ width: '100%', zIndex:0}}>
                        <CardContent>
                          <Typography style={{ color: textColor, fontFamily: 'Courier New' }} variant="h5" component="div">
                            Announcments for {classes[index]}: {ann}
                          </Typography>
                        </CardContent>
                      </Card>

                  </Grid>
                 
                ))}
              
            </Typography>
          </div> 
        </Box>
        <Box sx={{height: '100vh', width: '100%', marginTop: '5%', bgcolor: containerColor}} />
      </Container>
    </div>
  );
}

export default Home;
  