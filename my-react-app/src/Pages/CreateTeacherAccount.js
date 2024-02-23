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
import * as themes from '.././Config';

// Used to call API's on the backend
import axios from 'axios';

function CreateTeacherAccount() {
  
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    cpassword: ''
  });

  const [file, setFile] = React.useState();

  // Handler for Submit button click
  const handleClickSubmit = (e) => {

    // Prevent default event (e) from occuring
    e.preventDefault();

    // if the user does not upload their file to prove they are a teacher
    if(handleFormSubmit() === false){
      alert("Please select a file")
      return;
    }

    // sends an HTTP POST request to the URL login backend API
    axios.post('http://localhost:8081/account/create_Taccount', values)

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

  const handleFormSubmit = () => {
    const formData = new FormData()
    formData.append("image", file)
      // check that the user has selected a file
      if(file){

        axios.post('http://localhost:8081/upload/uploadFile', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        return true
      }

      return false
  }

  const handleClickBack = () => {
    // Use navigate to go to the UserProfile page
    navigate('/');
  }
  const handleLoginClick = () => {
    // Use navigate to go to the UserProfile page
    navigate('/Login');
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
      {/* Box used to display background image - bg.jpg */}
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
    
      <PlainNavBar text='Edu Hub Collaborate'></PlainNavBar >
      
      {/* Container and Grid organizes HeaderBox and Buttons */}
      <Container maxWidth='sm' style={{ background: containerColor, marginTop: '75px', height: '790', marginBottom:'75px'}} >
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
              <input
                filename={file} 
                onChange={e => setFile(e.target.files[0])} 
                type="file" 
                accept="image/*"
              ></input>
          </Grid>
  
          <Grid item xs={1}>
            <Button variant="contained" size="large"  onClick={handleClickSubmit} style={{ width: '200px', background: buttonColor, color: textColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
              Submit
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: buttonColor, color: textColor }} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '3%', marginLeft: '-30%'}} >
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

export default CreateTeacherAccount;