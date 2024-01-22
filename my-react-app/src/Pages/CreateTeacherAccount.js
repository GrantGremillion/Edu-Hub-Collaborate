import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '../Components/HeaderBox';
import NavBar from '../Components/NavBar'

// Allows us to navigate between web pages
import { useNavigate } from 'react-router-dom';

// background image
import bg from '.././Images/bg.jpg';

function CreateTeacherAccount() {
  
  // Temporary values to handle the button click redirection
  const navigate = useNavigate();
  const handleClick = () => {
    // Use navigate to go to the UserProfile page
    navigate('/JoinClass');
  }
  const handleClickBack = () => {
    // Use navigate to go to the UserProfile page
    navigate('/');
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
    

      <NavBar text='Edu Hub Collaborate'></NavBar>
      

      {/* Container and Grid organizes HeaderBox and Buttons */}
      <Container maxWidth='sm' style={{ background: '#e0f2f1', marginTop: '75px', height: '700px', marginBottom:'75px'}} >
        <Grid container spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center">
          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
            <HeaderBox text={'Create your teacher account'}></HeaderBox>
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="Email" variant="filled" />
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="Password" variant="filled" type="password"/>
          </Grid>

          <Grid item xs={1}>
            <TextField id="filled-basic" label="Confirm password" variant="filled" type="password"/>
          </Grid>
  
          <Grid item xs={1}>
            <Button variant="contained" size="large"  onClick={handleClick} style={{ width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '25%'}} >
              Submit
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '-10%', marginLeft: '-225%'}} >
              Back
            </Button>
          </Grid>
          
          
        </Grid>
      </Container>
    </div>
    );
  }

  export default CreateTeacherAccount;