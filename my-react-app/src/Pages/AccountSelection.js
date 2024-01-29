
import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box, Divider} from '@mui/material';

// Our own custom-built components 
import HeaderBox from '.././Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'

// Allows us to navigate between web pages
import { useNavigate } from 'react-router-dom';

// background image
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
import pencil from '.././Images/pencil.png';
import paper from '.././Images/paper.png';

import {DARKMODE} from '.././Config';

function AccountSelection() {
  
  // Temporary values to handle the button click redirection
  const navigate = useNavigate();
  const handleStudentClick = () => {
    // Use navigate to go to the student account creation page
    navigate('/CreateStudentAccount');
  }
  const handleTeacherClick = () => {
    // Use navigate to go to the teacher account creation page
    navigate('/CreateTeacherAccount');
  }

  if (DARKMODE) {
    return (
      <div>
        {/* Box used to display background image - bg.jpg */}
        <Box
          className="bg"
          style={{
          backgroundImage: `url(${dark_bg})`,
          backgroundSize: "cover",
          zIndex: '-1',
          position: 'fixed', // Make sure it covers the whole viewport
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          }}>
        </Box>
    
        <PlainNavBar text='Edu Hub Collaborate'></PlainNavBar >

        {/* Container and Grid organizes HeaderBox and Buttons */}
        <Container maxWidth='sm' style={{ background: '#216E6B', marginTop: '75px', height: '700px', marginBottom:'75px'}} >
          <Grid container spacing={5}
              direction="column"
              alignItems="center"
              justifyContent="center">
            <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
              <HeaderBox text={'Select your account type'}></HeaderBox>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained"  size="large"  onClick={handleStudentClick} style={{ width: '200px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large'}} >
                Student
              </Button>
            </Grid>
            <Divider orientation="horizontal" flexItem style={{ margin: '5%', width: '50%', marginLeft: '28%', marginBottom: '0%', color: 'white'}} >or</Divider>
            <Grid item xs={1}>
              
              <Button variant="contained" size="large"  onClick={handleTeacherClick} style={{ width: '200px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large'}} >
                Teacher
              </Button>
            </Grid>
            <Grid item xs={1}>
                <img src={pencil} alt="pencil" style={{marginTop: '5%', marginLeft: '65%', width: '35%'}} />
              
                <img src={paper} alt="paper" style={{ marginTop: '-40%', marginLeft: '-5%', width: '40%'}}/>     
            </Grid>
            
          </Grid>
        </Container>
      </div>
    );
  }
  else {
    return (
      <div>
        {/* Box used to display background image - bg.jpg */}
        <Box
          className="bg"
          style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          zIndex: '-1',
          position: 'fixed', // Make sure it covers the whole viewport
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          }}>
        </Box>
      
        <PlainNavBar text='Edu Hub Collaborate'></PlainNavBar >
        
        {/* Container and Grid organizes HeaderBox and Buttons */}
        <Container maxWidth='sm' style={{ background: '#e0f2f1', marginTop: '75px', height: '700px', marginBottom:'75px'}} >
          <Grid container spacing={5}
              direction="column"
              alignItems="center"
              justifyContent="center">
            <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
              <HeaderBox text={'Select your account type'}></HeaderBox>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained"  size="large"  onClick={handleStudentClick} style={{ width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large'}} >
                Student
              </Button>
            </Grid>
            <Divider orientation="horizontal" flexItem style={{ margin: '5%', width: '50%', marginLeft: '28%', marginBottom: '0%'}} >or</Divider>
            <Grid item xs={1}>
              
              <Button variant="contained" size="large"  onClick={handleTeacherClick} style={{ width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large'}} >
                Teacher
              </Button>
            </Grid>
            <Grid item xs={1}>
                <img src={pencil} alt="pencil" style={{marginTop: '5%', marginLeft: '65%', width: '35%'}} />
              
                <img src={paper} alt="paper" style={{ marginTop: '-40%', marginLeft: '-5%', width: '40%'}}/>     
            </Grid>
            
          </Grid>
        </Container>
      </div>
    );
  }
}

  export default AccountSelection;
  