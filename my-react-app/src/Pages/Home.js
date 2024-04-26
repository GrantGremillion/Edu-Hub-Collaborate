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
        <Box sx={{height: 'fit-content', width: '100%', marginTop: '5%', bgcolor: containerColor}} >
          <div style={{ textAlign: 'center'}}>
            <Typography variant='h3' gutterBottom sx={{fontFamily: 'Courier New', paddingTop: '3%', color: textColor}}>
              Announcments
            </Typography>
            
            <Divider></Divider>
            <Typography sx={{fontSize: 'x-large', fontFamily: 'Courier New', paddingTop: '4%', color: textColor}}>
            
                {/*Mapping each of the notecard sets retrieved from the backend to be displayed on cards*/}
                {announcements.map((ann, index) => (

                  ann ? (
                  
                  <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
                      <Card variant="outlined" style={{ width: '100%', zIndex:0}}>
                        <CardContent>
                          <Typography style={{ color: textColor, fontFamily: 'Courier New' }} variant="h5" component="div">
                            {classes[index]}: {ann}
                          </Typography>
                        </CardContent>
                      </Card>

                  </Grid>
                  ) : (<></>)
                 
                ))}
              
            </Typography>
          </div> 
        </Box>

        <Box sx={{height: 'fit-content', width: '100%', marginTop: '5%', bgcolor: containerColor}} >
          <div style={{ textAlign: 'center'}}>
            <Typography variant='h4' gutterBottom sx={{fontFamily: 'Courier New', paddingTop: '3%', color: textColor}}>
              Upcomming Meetings
            </Typography>
            
            <Divider></Divider>
            <Typography sx={{fontSize: 'x-large', fontFamily: 'Courier New', paddingTop: '4%', color: textColor}}>
              
            </Typography>
          </div> 
        </Box>

        <Box sx={{height: 'fit-content', width: '100%', marginTop: '5%', bgcolor: containerColor}} >
          <div style={{ textAlign: 'center'}}>
            <Typography variant='h4' gutterBottom sx={{fontFamily: 'Courier New', paddingTop: '3%', color: textColor}}>
              New Notecard Sets
            </Typography>
            
            <Divider></Divider>
            <Typography sx={{fontSize: 'x-large', fontFamily: 'Courier New', paddingTop: '4%', color: textColor}}>
              
            </Typography>
          </div> 
        </Box>

        <Box sx={{height: 'fit-content', width: '100%', marginTop: '5%', bgcolor: containerColor}} >
          <div style={{ textAlign: 'center'}}>
            <Typography variant='h4' gutterBottom sx={{fontFamily: 'Courier New', paddingTop: '3%', color: textColor}}>
              About Us
            </Typography>
              
            <Divider></Divider>
            <Typography sx={{fontSize: 'medium', fontFamily: 'Courier New', padding: '4%', color: textColor}}>
            Welcome to Edu Hub Collaborate, where learning meets collaboration! Our platform is designed to empower both teachers and students in the pursuit of knowledge. With Edu Hub Collaborate, teachers can easily create classes and provide a dynamic learning environment for their students. Students, in turn, have the opportunity to join these classes, fostering a vibrant community of learning.
            One of the key features of Edu Hub Collaborate is the seamless communication between teachers and students. Teachers can effortlessly share announcements directly to students' homepages, keeping them informed and engaged. Additionally, our platform allows teachers to create notecard sets, enabling students to enhance their understanding through effective study tools.
            But the collaboration doesn't stop there. Each class has its own dedicated chat room, where students and teachers can engage in discussions, ask questions, and even share files, facilitating interactive learning experiences. Furthermore, our calendar page empowers teachers to schedule events such as study sessions, ensuring efficient time management and coordination.
            Join Edu Hub Collaborate today and embark on a journey towards collaborative learning excellence!
               
            </Typography>
          </div> 
        </Box>
        
      </Container>
    </div>
  );
}

export default Home;
  