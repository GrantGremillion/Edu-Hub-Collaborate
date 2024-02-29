import * as React from 'react';
// Material UI components
import {Button, Grid, Container, TextField, Box, Divider} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';

import bg from '../Images/bg.jpg'; 
import GoBackButton from '../Components/GoBackButton';

// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '.././Config';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../Components/Sidebar';

import axios from 'axios';

import { useCookies } from 'react-cookie';



function JoinClass() {

  const [cookies] = useCookies(['userID']);

  const [key, setKey] = useState({
    key: '',
    Sid: cookies.userID
  });

  const navigate = useNavigate();
  const handleClickClasses = () => {
      navigate("/ClassesDisplay")
  };

  const handleClickJoinClass = (e) => {

    // Prevent default event (e) from occuring
    e.preventDefault();
    // sends an HTTP POST request to the URL login backend API
    axios.post('http://localhost:8081/classes/join_class', key)

    // testing 
    .then(res => {
      if(res.data.Status === "Success") {
        navigate('/ClassesDisplay');
      }
      else{
        console.log("Failed");
      }
    })
    .catch(err => console.log(err));
  }


  // checks for the theme the page is in, and applys it to these variables
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
      <Sidebar></Sidebar>
  
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
          }}> 
      </Box>
    
      <Container maxWidth="sm" style={{ background: containerColor, marginTop: '75px', height: '550px', marginBottom:'75px'}}>
        <Grid container spacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center">
  
          <Grid item>
            <HeaderBox text="Student Classes" />
          </Grid>
  
          <Grid item xs={2}>
            <TextField variant="filled" label="Access Key" 
              onChange={e => setKey({...key,key:e.target.value})}/>
          </Grid>
  
          <Grid item xs={2}>
            <Button variant="contained" size="large"  onClick={handleClickJoinClass} style={{ width: '220px', color: textColor, background: buttonColor}} >
              Join Class
            </Button>
          </Grid>
  
          <Divider 
            orientation="horizontal" 
            flexItem 
            style={{ marginTop: '5%', marginLeft: '3%', color: textColor}}>
            or
          </Divider>
  
          <Grid item xs={2}>
            <Button variant="contained" size="large"  onClick={handleClickClasses} style={{ width: '220px', color: textColor, background: buttonColor}} >
              View Classes
            </Button>
          </Grid> 
  
          <Grid item xs={12}>
            <GoBackButton />
          </Grid>
  
        </Grid>
      </Container>   
    </div>
  );

}

export default JoinClass;