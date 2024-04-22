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
import { useTheme } from '@mui/material/styles';


function UserProfile() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['email']);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const isDarkMode = themes.DARKMODE;
    const theme = useTheme();
    

    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = cookies.email; // Make sure this is the correct key for the email
            console.log('Fetching data for email:', userEmail);
    
            if (!userEmail) {
                console.log("No email found in cookies.");
                return; // Exit if no email is found
            }
    
            const fetchUrl = `${process.env.REACT_APP_API_URL}/getUserProfile?email=${encodeURIComponent(userEmail)}`;
            console.log('Fetch URL:', fetchUrl);
    
            try {
                const response = await fetch(fetchUrl);
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

    const profileStyles = {
        backgroundStyle: {
            backgroundImage: `url(${isDarkMode ? dark_bg : bg})`,
            backgroundSize: "cover",
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            minHeight: '100%',
            zIndex: -1,
            marginBottom: "50px"
        },
        containerStyle: {
            position: 'relative',
            marginTop: '50px',
            marginBottom: '50px',
            height: 'fit-content',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2em 1em', // Use em units for padding for scalability
            // Responsive design adjustments
            '@media (min-width:600px)': {
            padding: '2em 3em', // Larger padding for larger screens
        },
            background: isDarkMode ? themes.darkContainer : themes.normalContainer,
            boxShadow: 'none'
        },
        paperStyle: {
            padding: '16px',
            width: '100%', // Use full width to maintain consistent size
            marginBottom: '16px',
            backgroundColor: isDarkMode ? '#424242' : '#fff'
        },
        buttonStyle: {
            margin: '8px 0',
            width: '100%',
            color: isDarkMode ? themes.darkText : themes.normalText,
            background: isDarkMode ? themes.darkButton : themes.normalButton,
        }
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Box sx={profileStyles.backgroundStyle}></Box>
            <Sidebar/>
            <Container maxWidth='sm' sx={profileStyles.containerStyle} >
                <Grid item xs={12} paddingBottom = "5%" >
                    <HeaderBox text={'Your User Profile'} />
                </Grid>
                <Paper elevation={3} sx={profileStyles.paperStyle}>
                    <Typography variant="h6">Display Name:</Typography>
                    <Typography>{displayName || "Not Available"}</Typography>
                </Paper>
                <Paper elevation={3} sx={profileStyles.paperStyle}>
                    <Typography variant="h6">Bio:</Typography>
                    <Typography>{bio || "Not Available"}</Typography>
                </Paper>
                <Button 
                    variant="contained" 
                    onClick={handleEditProfileClick} 
                    sx={profileStyles.buttonStyle}
                >
                    Edit Profile
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleAccountSettingsClick} 
                    sx={profileStyles.buttonStyle}
                >
                    Account Settings
                </Button>
            </Container>
        </Box>
    );
}

export default UserProfile;