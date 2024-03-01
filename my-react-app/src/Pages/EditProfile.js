// The react framework
import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField, Typography, Paper} from '@mui/material';
// Premade components we set up and put in the Components folder for reusability
import HeaderBox from '.././Components/HeaderBox';
import Sidebar from '../Components/Sidebar';
// Used to navigate between web pages
import { useNavigate } from 'react-router-dom';
// solid background images for website
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
// handles darkmode toggle on the page
import * as themes from '.././Config';


function UserProfile() {

    // handles the button presses
    const navigate = useNavigate();
    const handleEditProfileClick = () => {
        // Use navigate to go to the UserProfile page
        navigate("/EditProfile");
    }
    const handleAccountSettingsClick = () => {
        navigate("/UserAccountSettings");
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
        
            <Sidebar/>

            {/* Container and Grid organizes HeaderBox and Buttons */}
            <Container maxWidth='sm' style={{ background: containerColor, marginTop: '75px', height: '700px', marginBottom:'75px'}} >
                <Grid container spacing={5}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">
                    <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
                        <HeaderBox text={'Edit Profile'}></HeaderBox>
                    </Grid>

                    <Grid item xs={3} >
                        <Typography sx={{fontFamily: 'Courier New', fontSize: 20}}>Change Display Name:</Typography>
                        <TextField size='large'></TextField>
                    </Grid>


                    {/* <Grid item xs={3} >
                        <Typography sx={{fontFamily: 'Courier New', fontSize: 20}}>Display Name:</Typography>
                        <Paper elevation={3} sx={{padding:3}}>
                            <Typography sx={{fontFamily: 'Courier New', fontSize: 15}}>ggrem</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography sx={{fontFamily: 'Courier New', fontSize: 20}}>Bio:</Typography>
                        <Paper elevation={3} sx={{padding:3}}>
                            <Typography sx={{fontFamily: 'Courier New', fontSize: 15}}>
                            My name is Grant and I am a human
                            <br/>
                            being who likes to learn!
                            </Typography>
                        </Paper>
                        
                    </Grid>

                    <Grid item xs={3}>
                        <Button size="small"  onClick={handleEditProfileClick} style={{ color: textColor, width: '200px', background: buttonColor }} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Edit Profile
                        </Button>
                    </Grid>*/}

                    
                    <Grid item xs={4}>
                        <Button size="small"  onClick={handleAccountSettingsClick} style={{ color: textColor, width: '200px', background: buttonColor }} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Apply Changes
                        </Button>
                    </Grid> 

                </Grid>
            </Container>
        </div>
    );
}
export default UserProfile;