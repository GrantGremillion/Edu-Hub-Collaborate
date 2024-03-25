import React, { useState } from 'react';
import { Button, Grid, Container, Box, Typography, Divider } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar';
import bg from '../Images/bg.jpg';
import GoBackButton from '../Components/GoBackButton';
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '.././Config';
import { useNavigate } from 'react-router-dom';

function ReportPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        // Use navigate to go to the UserProfile page
        navigate("/Home");
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
            <PlainNavBar text='Edu Hub Collaborate' />
            <Box
                className="bg"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
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
            <Container maxWidth="sm" height="fit-content" style={{ background: containerColor, marginTop: '75px', paddingBottom: '25px' }}>
                <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <HeaderBox text={'Report an Issue or Violation'} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography fontFamily="Courier New" alignItems="center" justifyContent="center" fontSize="large" marginBottom="25px">
                            If you encounter any bugs or issues with the website, please do not hesitate to email us at eduhubcollaborate@gmail.com with information on the issue you are having. Also feel free to message us with any ideas for improvements!
                        </Typography>
                    

                        <Divider sx={{ borderBottomWidth: 2 }}></Divider>

                    
                        <Typography fontFamily="Courier New" alignItems="center" justifyContent="center" fontSize="large" marginTop="25px">
                            Since different schools have different Academic Honesty statements and requirements of their students, it is not realistically within our power to police potential cheating or Academic Dishonesty. Please contact your teacher if you suspect cheating is taking place.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Button size="small"  onClick={handleClick} style={{ color: textColor, width: '250px', background: buttonColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Return to Home
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default ReportPage;
