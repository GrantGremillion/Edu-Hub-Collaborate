import * as React from 'react';
// Material UI components
import {Button, Grid, Container, TextField, Box} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'; 
import GoBackButton from '../Components/GoBackButton';

// theme components
import bg from '../Images/bg.jpg'; 
import dark_bg from '../Images/dark_bg.jpg';
import * as themes from '.././Config';


import { useNavigate } from 'react-router-dom';
import axiosInstance from '../helpers/axios';
import { useCookies } from 'react-cookie';


function CreateClass() {

  const [cookies] = useCookies(['userID']);

  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    cname: '',
    cdes: '',
    Tid: cookies.userID
  });

  const handleClickSubmit = (e) => {

    e.preventDefault();
    
    // sends an HTTP POST request to the URL login backend API
    axiosInstance.post('/classes/create_class', values)

    // testing 
    .then(res => {
      if(res.data.Status === "Success") {
        console.log("Success")
        navigate('/ClassesDisplay')
      }
      else{
        alert(res.data.Status)
      }
      
    });
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

      <Container maxWidth="sm" style={{ background: containerColor, marginTop: '75px', height: 'fit-content', marginBottom:'75px', paddingBottom: "3%"}}>
        <Grid container spacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center">

          <Grid item>
            <HeaderBox text="Create A Class" />
          </Grid>

          <Grid item xs={2}>
            <TextField variant="filled" label="Class Name" onChange={e => setValues({...values,cname:e.target.value})}/>
          </Grid>

          <Grid item xs={2}>
            <TextField variant="filled" label="Class Description" onChange={e => setValues({...values,cdes:e.target.value})}/>
          </Grid>

          <Grid item xs={3}>
            <Button variant="contained" size="large"  onClick={handleClickSubmit} style={{ width: '220px', background: buttonColor, color: textColor}} >
              Submit
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

export default CreateClass;
  