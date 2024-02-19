// The react framework
import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField} from '@mui/material';
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
//import GoBackButton from '../Components/GoBackButton';

function UserProfile() {

    // handles the button presses
    const navigate = useNavigate();
    const handleClick = () => {
        // Use navigate to go to the UserProfile page
        alert('Placeholder: Does not lead to a page yet!');
    }
    const goToSettings = () => {
        navigate("/UserAccountSettings");
    }
    const goToHome = () => {
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
        var containerColor = themes.normalContainer;
        var buttonColor = themes.normalButton;
        var textColor = themes.normalText;
        var background = bg;
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
                        <HeaderBox text={'Your User Profile'}></HeaderBox>
                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            id="filled-multiline-static"
                            label="Edit Bio"
                            multiline
                            rows={4}
                            defaultValue="Empty"
                            variant="filled"
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <Button size="small"  onClick={handleClick} style={{ color: textColor, width: '200px', background: buttonColor }} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Notifications
                        </Button>
                    </Grid>
        
                    <Grid item xs={3}>
                        <Button size="small"  onClick={handleClick} style={{ color: textColor, width: '200px', background: buttonColor }} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Messages
                        </Button>
                    </Grid>

                    <Grid item xs={4}>
                        <Button size="small"  onClick={goToSettings} style={{ color: textColor, width: '200px', background: buttonColor }} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Account Settings
                        </Button>
                    </Grid>

                    <Grid item xs={4}>
                        <Button size="small"  onClick={goToHome} style={{ color: textColor, width: '200px', background: buttonColor }} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Back to Home
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
export default UserProfile;