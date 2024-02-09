import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'

// Allows us to navigate between web pages
import { useNavigate } from 'react-router-dom';

// background image
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';

// dark theme functionality
import {DARKMODE} from '.././Config';

// Used to call API's on the backend
import axios from 'axios';

function CreateTeacherAccount() {
  
  // Temporary values to handle the button click redirection
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    cpassword: ''
  })

  // Handler for Submit button click
  const handleClickSubmit = (e) => {

    // Prevent default event (e) from occuring
    e.preventDefault();
    // sends an HTTP POST request to the URL login backend API
    axios.post('http://localhost:8081/create_Taccount', values)

    // testing 
    .then(res => {
      if(res.data.Status === "Success") {
        navigate('/Login')
      }
      else{
        alert(res.data.Status)
      }
      
    })
  }

  const handleClickBack = () => {
    // Use navigate to go to the UserProfile page
    navigate('/');
  }
  const handleLoginClick = () => {
    // Use navigate to go to the UserProfile page
    navigate('/Login');
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
              <HeaderBox text={'Create your teacher account'}></HeaderBox>
            </Grid>

            <Grid item xs={1}>
              <TextField id="filled-basic" label="Email" variant="filled" 
              onChange={e => setValues({...values,email:e.target.value})}/>
            </Grid>

            <Grid item xs={1}>
              <TextField id="filled-basic" label="Password" variant="filled" type="password"
              onChange={e => setValues({...values,password:e.target.value})}/>
            </Grid>

            <Grid item xs={1}>
              <TextField id="filled-basic" label="Confirm password" variant="filled" type="password" 
              onChange={e => setValues({...values,cpassword:e.target.value})}/>
            </Grid>

            {/*File submission form*/}
            <Grid item xs={1}>
                <form>
                  <TextField type="file" />
                    <Button variant="contained" component="span" sx={{bgcolor: '#009688'}}>
                    Upload
                    </Button>
                </form>
              </Grid>
    
            <Grid item xs={1}>
              <Button variant="contained" size="large"  onClick={handleClickSubmit} style={{ width: '200px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '15%'}} >
                Submit
              </Button>
            </Grid>

            <Grid item xs={1}>
              <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '3%', marginLeft: '-30%'}} >
                Back
              </Button>

              <Button fullWidth color="secondary" size="small" onClick={handleLoginClick} sx={{ width: '235px', marginTop: '-20%', marginLeft: '65%'}}>
                Already have an account?
              </Button>
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
          <Container maxWidth='sm' style={{ background: '#e0f2f1', marginTop: '75px', height: '800px', marginBottom:'75px'}} >
            <Grid container spacing={5}
                direction="column"
                alignItems="center"
                justifyContent="center">
              <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
                <HeaderBox text={'Create your teacher account'}></HeaderBox>
              </Grid>
  
              <Grid item xs={1}>
                <TextField id="filled-basic" label="Email" variant="filled" 
                onChange={e => setValues({...values,email:e.target.value})}/>
              </Grid>

              <Grid item xs={1}>
                <TextField id="filled-basic" label="Password" variant="filled" type="password"
                onChange={e => setValues({...values,password:e.target.value})}/>
              </Grid>

              <Grid item xs={1}>
                <TextField id="filled-basic" label="Confirm password" variant="filled" type="password" 
                onChange={e => setValues({...values,cpassword:e.target.value})}/>
              </Grid>

              {/*File submission form*/}
              <Grid item xs={1}>
                <form>
                  <TextField type="file" />
                    <Button variant="contained" component="span" sx={{bgcolor: '#009688'}}>
                    Upload
                    </Button>
                </form>
              </Grid>

      
              <Grid item xs={1}>
                <Button variant="contained" size="large"  onClick={handleClickSubmit} style={{ width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '15%'}} >
                  Submit
                </Button>
              </Grid>
  
              <Grid item xs={1}>
                <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '3%', marginLeft: '-30%'}} >
                  Back
                </Button>
  
                <Button fullWidth color="secondary" size="small" onClick={handleLoginClick} sx={{ width: '235px', marginTop: '-20%', marginLeft: '65%'}}>
                  Already have an account?
                </Button>
              </Grid>
                
            </Grid>
          </Container>
        </div>
        );
    }
  }

  export default CreateTeacherAccount;