import * as React from 'react';
import {useState} from 'react';
// Material UI components
import {Button, Grid, Container, TextField, Box} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';

// Allows us to navigate between web pages
import { useNavigate } from 'react-router-dom';

import bg from '../Images/bg.jpg'; // Assuming this is your background image
import PlainNavBar from '../Components/PlainNavBar'; // Assuming this is your custom navigation component

function TeacherAnswering() {

const [text, setText] = useState("");
const handleSubmit = (event) => {
  event.preventDefault();
  setText(event.target[0].value);
};

const navigate = useNavigate();
const handleClickBack = () => {
  // Use navigate to go to the UserProfile page
  navigate('/TClassOptions');
}

return (
  <div>
          <PlainNavBar />
        <Box
            className="bg"
            style={{
                backgroundImage: `url(${bg})`,
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

            
        <Container maxWidth="sm" style={{ background: '#e0f2f1', marginTop: '75px', height: '700px', marginBottom:'75px'}}>


      <Grid container spacing={4}
        direction="column"
        alignItems="center"
        justifyContent="center">
        <Grid item>
          <HeaderBox text="Student Question" />

        </Grid>
        <Grid item xs={2}>
          <TextField variant="filled" label="Answer Here" />

        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" size="large"  onClick={(handleSubmit)} style={{ width: '220px'}} sx={{fontFamily: 'Courier New', fontSize: 'large'}}>
            Submit Answer
          </Button>
        </Grid>

        <Grid item xs={1}>
        <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '310%', marginLeft: '-230%'}} >
          Back
        </Button>

        </Grid> 

      </Grid>
    </Container>   
  </div>
  );
}

export default TeacherAnswering;
