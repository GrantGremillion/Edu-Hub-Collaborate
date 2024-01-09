
import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';
import NavBar from '.././Components/NavBar'

// Allows us to navigate between web pages
import { useNavigate } from 'react-router-dom';

// background image
import bg from '.././Images/bg.jpg';
import pencil from '.././Images/pencil.png';
import paper from '.././Images/paper.png';


function AccountSelection() {
  
  // Temporary values to handle the button click redirection
  const navigate = useNavigate();
  const handleClick = () => {
    // Use navigate to go to the UserProfile page
    navigate('/UserProfile');
  }

  return (
    <div>
      {/* Box used to display background image - bg.jpg */}
      <Box
        class="bg"
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
    
      <NavBar></NavBar>
      
      {/* Container organizes HeaderBox and Buttons */}
      <Container maxWidth='sm' style={{ background: '#e0f2f1', marginTop: '75px', height: '700px', marginBottom:'75px'}} >
        <Grid container spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center">
          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
            <HeaderBox text={'Please select your account type'}></HeaderBox>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained"  size="large"  onClick={handleClick} style={{ width: '200px', background: '#b2dfdb'}} >
              Student
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" size="large"  onClick={handleClick} style={{ width: '200px', background: '#b2dfdb'}} >
              Teacher
            </Button>
          </Grid>
          <Grid item xs={3}>

              <img src={pencil} alt="pencil" style={{marginTop: '10%', marginLeft: '60%', width: '35%'}} />
            
              <img src={paper} alt="paper" style={{marginTop: '-50%', marginLeft: '0%', width: '40%'}}/>
        
            
          </Grid>
          
        </Grid>
      </Container>
    </div>
    );
  }

  export default AccountSelection;
  