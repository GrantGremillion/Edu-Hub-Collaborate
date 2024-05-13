import React, { useState, useEffect } from 'react';
// Other imports remain the same
import { Button, Grid, Container, Box, TextField, Typography, Paper } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import bg from '../Images/bg.jpg';
import dark_bg from '../Images/dark_bg.jpg';
import { useCookies } from "react-cookie";
import { useTheme } from '@mui/material/styles';

import * as themes from '.././Config';
import darkModeImg from './dark.png';
import lightModeImg from './light.png';

function UserProfile({ themeToggle }) {
    const navigate = useNavigate();
    // fetches the user set dark theme preference and email
    const [cookies] = useCookies(['email', 'theme']);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    //const isDarkMode = themes.DARKMODE;
    const theme = useTheme();

    const [isDarkMode, setIsDarkMode] = useState(cookies.theme);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
        themeToggle(!isDarkMode);
        themes.DarkmodeToggle(!isDarkMode);
        //setCheck(!isDarkMode);
        // Here you would also include any logic to actually change the theme.
    };

    const handleChangePasswordClick = () => {
        navigate('/ChangePassword');
    }

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
            backgroundImage: `url(${themes.DARKMODE ? dark_bg : bg})`,
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

            pt: '35px', // paddingTop
            pb: '35px', // paddingBottom
            height: 'fit-content', // minHeight to handle content size
            marginTop: "50px",
            marginBottom: "50px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: isDarkMode ? themes.darkContainer : themes.normalContainer,
            width: '100%', // Set the width to 100% by default
            '@media (min-width:600px)': {
                maxWidth: 'sm', // Apply 'sm' maxWidth for screens wider than 600px
            },
            // Add more media queries as needed for different breakpoints
        },
        paperStyle: {
            padding: '16px',
            width: '50%', // Use full width to maintain consistent size
            marginBottom: theme.spacing(5),
            backgroundColor: isDarkMode ? themes.darkButton : themes.normalButton,
        },
        buttonStyle: {
            margin: '12px 0',
            width: 'fit-content',
            color: isDarkMode ? themes.darkText : themes.normalText,
            background: isDarkMode ? themes.darkButton : themes.normalButton,
            fontFamily: "Courier New",
            fontSize: "large",
        },
        headerBoxWrapperStyle: {
            width: 'auto', // The HeaderBox should take up the full width of its parent
            padding: theme.spacing(2), // Use theme's spacing for responsive padding
            boxSizing: 'border-box', // Include padding in the element's total width
        }
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Box
                className="bg"
                style={{
                    backgroundImage: `url(${isDarkMode ? dark_bg : bg})`,
                    backgroundSize: "cover",
                    zIndex: -1,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />
            <Sidebar />
            <Container sx={profileStyles.containerStyle} >
                <Box sx={profileStyles.headerBoxWrapperStyle}>
                    <HeaderBox text={'User Profile'} />
                </Box>


                <Grid container direction="row" sx={{ marginTop: '5%' }}>

                    <Paper elevation={3} sx={profileStyles.paperStyle} >
                        <Typography style={{ color: themes.DARKMODE ? themes.darkText : themes.normalText }}
                            variant="h6"
                            sx={{ fontFamily: "Courier New", fontWeight: "bold" }}>Display Name:</Typography>
                        <Typography style={{ color: themes.DARKMODE ? themes.darkText : themes.normalText }}
                            sx={{ fontFamily: "Courier New", fontWeight: "bold" }}>{displayName || "No display name set yet!"}</Typography>
                    </Paper>

                    <Paper elevation={3} sx={profileStyles.paperStyle}>
                        <Typography style={{ color: themes.DARKMODE ? themes.darkText : themes.normalText }}
                            variant="h6"
                            sx={{ fontFamily: "Courier New", fontWeight: "bold" }}> Email:</Typography>
                        <Typography style={{ color: themes.DARKMODE ? themes.darkText : themes.normalText }}
                            sx={{ fontFamily: "Courier New", fontWeight: "bold" }}>{cookies.email}</Typography>
                    </Paper>
                </Grid>



                <Paper elevation={3} sx={profileStyles.paperStyle}>
                    <Typography style={{ color: themes.DARKMODE ? themes.darkText : themes.normalText }}
                        variant="h6"
                        sx={{ fontFamily: "Courier New", fontWeight: "bold" }}>Bio:</Typography>
                    <Typography style={{ color: themes.DARKMODE ? themes.darkText : themes.normalText }}
                        sx={{ fontFamily: "Courier New", fontWeight: "bold" }} >{bio || "No bio set yet!"}</Typography>
                </Paper>

                <Button
                    variant="contained"
                    onClick={handleEditProfileClick}
                    sx={profileStyles.buttonStyle}
                >
                    Edit Profile
                </Button>

                <Grid item xs={2}>
                    <Button size="small" onClick={handleChangePasswordClick}
                        style={{
                            color: themes.DARKMODE ? themes.darkText : themes.normalText,
                            width: '200px',
                            background: themes.DARKMODE ? themes.darkButton : themes.normalButton
                        }}
                        sx={{
                            fontFamily: 'Courier New',
                            fontSize: 'large',
                            marginTop: '5%'
                        }} >
                        Change Password
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: "12.5%",
                            bgcolor: isDarkMode ? themes.darkButton : themes.normalButton,
                            color: 'primary.white',
                            p: 1,
                            borderRadius: 1,
                            cursor: 'pointer', // To show it's clickable
                        }}
                        onClick={handleThemeToggle}
                    >
                        <img
                            src={isDarkMode ? darkModeImg : lightModeImg}
                            alt="Toggle Theme"
                            style={{ maxWidth: '30px', maxHeight: '30px' }} // adjust size as needed
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                ml: 1, // margin left
                                color: isDarkMode ? themes.darkText : themes.normalText,
                                fontFamily: 'Courier New',
                                fontSize: "large"
                            }}
                        >
                            CHANGE THEME
                        </Typography>
                    </Box>
                </Grid>

            </Container>
        </Box>
    );
}

export default UserProfile;