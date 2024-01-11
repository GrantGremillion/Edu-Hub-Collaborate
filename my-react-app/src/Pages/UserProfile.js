// The react framework
import * as React from 'react';
// Material UI components
import {Button, Grid, Container, Box, TextField} from '@mui/material';
// Premade components we set up and put in the Components folder for reusability
import HeaderBox from '.././Components/HeaderBox';
import NavBar from '.././Components/NavBar'
// Used to navigate between web pages
import { useNavigate } from 'react-router-dom';
// solid background image for website
import bg from '.././Images/bg.jpg';

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

                {/* put buttons */}
                <Grid item xs={2}>
                    <Button size="small"  onClick={handleClick} style={{ color: 'black', width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                        Notifications
                    </Button>
                </Grid>
    
                <Grid item xs={3}>
                    <Button size="small"  onClick={handleClick} style={{ color: 'black', width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                        Messages
                    </Button>
                </Grid>

                <Grid item xs={4}>
                    <Button size="small"  onClick={goToSettings} style={{ color: 'black', width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                        Account Settings
                    </Button>
                </Grid>

            </Grid>
        </Container>
    </div>  
);
}
export default UserProfile;