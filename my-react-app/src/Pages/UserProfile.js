import React, { useState, useEffect } from 'react';
// Other imports remain the same
import {Button, Grid, Container, Box, TextField, Typography, Paper} from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import bg from '../Images/bg.jpg';
import dark_bg from '../Images/dark_bg.jpg';
import * as themes from '../Config';
import { useCookies } from "react-cookie";


function UserProfile() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['email']);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    

    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = cookies.email; // Make sure this is the correct key for the email
            console.log('Fetching data for email:', userEmail);
    
            if (!userEmail) {
                console.log("No email found in cookies.");
                return; // Exit if no email is found
            }
    
            const fetchUrl = `http://localhost:8081/getUserProfile?email=${encodeURIComponent(userEmail)}`;
            console.log('Fetch URL:', fetchUrl);
    
            try {
                const response = await fetch(fetchUrl, {
                    credentials: 'include', // Include credentials if necessary
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                console.log('Fetched user data:', userData);
    
                setDisplayName(userData.displayName);
                setBio(userData.bio);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, [cookies.email]);

    const handleEditProfileClick = () => {
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
            <Box className="bg" style={{ backgroundImage: `url(${themes.DARKMODE ? dark_bg : bg})`, backgroundSize: "cover", zIndex: '-1', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, }}></Box>
            <Sidebar/>
            <Container maxWidth='sm' style={{ background: themes.DARKMODE ? themes.darkContainer : themes.normalContainer, marginTop: '75px', height: '700px', marginBottom:'75px'}} >
                <Grid container spacing={5} direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
                        <HeaderBox text={'Your User Profile'} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={{fontFamily: 'Courier New', fontSize: 20}}>Display Name:</Typography>
                        <Paper elevation={3} sx={{padding:3}}>
                            <Typography sx={{fontFamily: 'Courier New', fontSize: 15}}>
                                {displayName || "Not Available"}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={{fontFamily: 'Courier New', fontSize: 20}}>Bio:</Typography>
                        <Paper elevation={3} sx={{padding:3}}>
                            <Typography sx={{fontFamily: 'Courier New', fontSize: 15}}>
                                {bio || "Not Available"}
                            </Typography>
                        </Paper>
                    </Grid>



                    <Grid item xs={12}>
                        <Button size="small" onClick={handleEditProfileClick} style={{ color: themes.DARKMODE ? themes.darkText : themes.normalText, width: '200px', background: themes.DARKMODE ? themes.darkButton : themes.normalButton }} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Edit Profile
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button size="small" onClick={handleAccountSettingsClick} style={{ color: themes.DARKMODE ? themes.darkText : themes.normalText, width: '200px', background: themes.DARKMODE ? themes.darkButton : themes.normalButton }} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Account Settings
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default UserProfile;