import * as React from 'react';
import {Button, Grid, Container, TextField, Box, Card, Typography, ButtonBase, Divider} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'; 

import CardContent from '@mui/material/CardContent';

import { useState, useEffect } from 'react';
import {useCookies } from "react-cookie";

import axios from 'axios';

// theme components
import bg from '../Images/bg.jpg'; 
import dark_bg from '../Images/dark_bg.jpg';
import * as themes from '.././Config';

function ClassesDisplay() {

  const [cookies] = useCookies(['userID','account']);
  const [classes, setClasses] = useState([]);

  // useEffect dynamically displays information on the page
  useEffect(() => {
    // Fetch classes data from the backend
    axios.post('http://localhost:8081/classes/get_classes', { Tid: cookies.userID })
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
  }, []);


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

    const handleClickClass = (classId) => {
      return
    };
  
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
          <Grid container spacing={4} direction="column">
            <Grid container spacing={3} justifyContent="center">
              {classes.map((classItem, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
                  <ButtonBase onClick={() => handleClickClass(classItem.class_id)} style={{ width: '100%', paddingLeft:'10%', paddingTop:'10%' }}>
                    <Card style={{ width: '100%' }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {classItem.class_name}
                        </Typography>
                        <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
                        <Typography variant="body2" color="text.secondary">
                          {classItem.class_description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Access Key: {classItem.access_key}
                        </Typography>
                      </CardContent>
                    </Card>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>

      </div>
    );
  }
  
  export default ClassesDisplay;