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


          <div>
            <h2>Classes</h2>
              <ul>
                {classes.map((classItem, index) => (
                  <li key={index}>
            <h3>{classItem.class_name}</h3>
            <p>{classItem.class_description}</p>
            <p>Access Key: {classItem.access_key}</p>
                  </li>
              ))}
            </ul>
          </div>

            {/* <Grid item xs={12} style={{}}>
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
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid> */}

          </Grid>
        </Container>
      </div>
    );
  }
  
  export default ClassesDisplay;