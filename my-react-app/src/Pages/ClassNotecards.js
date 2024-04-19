import * as React from 'react';
// Material UI components
import {Container, Box, Divider, Grid, Button, Typography, TextField, ButtonBase, Card, CardContent} from '@mui/material';
import bg from '../Images/bg.jpg'; // Assuming this is your background image
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';


// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '../Config';

import { useCookies } from "react-cookie";

import { useParams } from 'react-router-dom';



function ClassNotecards() {

  const { class_id } = useParams();

  const [cookies, setCookie, removeCookie] = useCookies(['userID','account']);

  const navigate = useNavigate();

  const [notecardSets, setNotecardSets] = useState([]);

  const handleAddNotecardSetClick = (e) => {
    e.preventDefault();
    navigate(`/CreateNotecards/${class_id}`);
  }

  //Darkmode Theme
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

  useEffect(() => {
        
    // Get all notecard sets
    axiosInstance.post('/notecards/get_sets', {Cid: class_id})
 
      .then(res => {
          if(res.data.Status === "Success") {
            setNotecardSets(res.data.Sets);
          }
          else{
              alert('Failed');
          }  
      })
    
  }, []);

return (
  <div>
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
        >
        </Box>

        <Sidebar/>

        {/*Container holding buttons and text*/}
        <Container style={{ background: containerColor, marginTop: '5%', height: '900px', width: '1100px', marginBottom:'60px'}}>
            <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">

              <Grid container spacing={3} justifyContent="left" style={{marginBottom: "35px"}}>

                {/*Mapping each of the notecard sets retrieved from the backend to be displayed on cards*/}
                {notecardSets.map((cardItem, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
                    <ButtonBase style={{ width: '100%', paddingLeft:'10%', paddingTop:'10%' }}>
                      <Card variant="outlined" style={{ backgroundColor: buttonColor, width: '100%', zIndex:0}}>
                        <CardContent>
                          <Typography style={{ color: textColor, fontFamily: 'Courier New' }} variant="h5" component="div">
                            {cardItem.set_name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </ButtonBase>
                  </Grid>
                ))}
              </Grid>
              
              {cookies.account === 'teacher' ? (
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                <ButtonBase onClick={handleAddNotecardSetClick} style={{marginTop: '20%'}}>
                    <Card variant="outlined" style={{ backgroundColor: buttonColor, width: 'fit-content', zIndex:0}}>
                        <CardContent >
                            <Typography fontFamily="Courier New" fontSize={25} >
                            Add A Notecard Set +
                            </Typography>
                        </CardContent>
                    </Card>
                </ButtonBase>
                </Grid>
                  
                ) : (
                  <></>
              )}

            </Grid> 
        </Container>
    </div>
  );
}

export default ClassNotecards;