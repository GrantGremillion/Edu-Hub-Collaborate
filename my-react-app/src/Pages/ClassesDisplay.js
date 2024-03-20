import * as React from 'react';
import {Grid, Container, Box, Button, Card, Typography, ButtonBase, Divider} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';
import Sidebar from '../Components/Sidebar';

import CardContent from '@mui/material/CardContent';

import { useState, useEffect } from 'react';
import {useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// theme components
import bg from '../Images/bg.jpg'; 
import dark_bg from '../Images/dark_bg.jpg';
import * as themes from '.././Config';

function ClassesDisplay() {

  const [cookies] = useCookies(['userID','account']);
  const [classes, setClasses] = useState([]);

  const navigate = useNavigate();

  const handleClickClass = (class_id) => {
    if(cookies.account === "student") {
      navigate(`/SClassOptions/${class_id}`);
      }
      else{
        navigate(`/TClassOptions/${class_id}`);
      }
  };
  
  const handleJoinClass = () => {
    navigate("/JoinClass")
  }
  
  // useEffect dynamically displays information on the page
  useEffect(() => {

    // If user is a teacher classes need to be fetched differently on the backend 
    if(cookies.account === 'teacher'){
      axios.post('http://localhost:8081/classes/get_teacher_classes', { Tid: cookies.userID })
      .then(res => {
        if (res.data.Status === "Success") {
          setClasses(res.data.classes);
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
      axios.post('http://localhost:8081/classes/get_student_classes', { Sid: cookies.userID })
        .then(res => {
          if (res.data.Status === "Success") {
            setClasses(res.data.classes);
          } else {
            alert(res.data.Status);
          }
        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });
    }
  }, [cookies]);

  

  // checks for the theme the page is in, and applys it to these variables
  if (themes.DARKMODE) {
    var containerColor = themes.darkContainer;
    var buttonColor = themes.darkButton;
    var textColor = themes.darkText;
    var background = dark_bg;
    var clickColor = 'white';
  }
  else {
    containerColor = themes.normalContainer;
    buttonColor = themes.normalButton;
    textColor = themes.normalText;
    background = bg;
    clickColor = 'black';
  }
  
  // To make a component auto-resize to the content within, you can set their 
  // height and width variables to "fit-content" and it will pixel perfect resize to match
  // its iternals. NOTE: you will need to edit the padding or margins to make there be a 
  // bit of space at the edges.
  return (
    <div>
      <Sidebar />
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
      

      <Container style={{ background: containerColor, marginTop: '75px', height: 'fit-content', width: '1000px'}}>
        <Grid container spacing={4} direction="column">

          <Grid item xs={12} marginLeft="23%">
            <HeaderBox text={'Your Classes'} />
          </Grid>

          <Grid container spacing={3} justifyContent="left" style={{marginBottom: "35px"}}>
            
            { classes.length === 0 ? (
            
            <Grid xs={12} marginLeft="22%" marginTop="7%" alignContent="center" justifyContent="center">
              <Grid>
                <Box fontFamily="Courier New" fontSize={30} >
                  You are not currently in any classes.
                </Box>
              </Grid>
              <Grid>
                <Button onClick={handleJoinClass} style={{ background: buttonColor, color: textColor }} sx={{ marginLeft: "35%", marginTop: "5%"}}>
                  Join Class
                </Button>
              </Grid>
            </Grid>

            ) : (
  
            classes.map((classItem, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
                <ButtonBase onClick={() => handleClickClass(classItem.Cid)} style={{ width: '100%', paddingLeft:'10%', paddingTop:'10%' }}>
                  <Card variant="outlined" style={{ backgroundColor: buttonColor, color: clickColor, width: '100%', zIndex:0}}>
                    <CardContent>
                      <Typography style={{ color: textColor, fontFamily: 'Courier New' }} variant="h5" component="div">
                        {classItem.class_name}
                      </Typography>
                      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
                      <Typography style={{ color: textColor, fontFamily: 'Courier New' }} variant="body2" color="text.secondary">
                        {classItem.class_description}
                      </Typography>
                      <Typography style={{ color: textColor, fontFamily: 'Courier New' }} variant="body2" color="text.secondary">
                        Access Key: {classItem.access_key}
                      </Typography>
                    </CardContent>
                  </Card>
                </ButtonBase>
              </Grid>
            ))

            )

            }

            
          </Grid>
        </Grid>
      </Container>

    </div>
  );
}
  
export default ClassesDisplay;