// The react framework
import React, { useState } from 'react';
// Material UI components
// FormGroup and FormControlLabel are needed for switches with text.
import { Button, Grid, Container, Box, Switch, FormGroup, FormControlLabel, Typography } from '@mui/material';
// Premade components we set up and put in the Components folder for reusability
import HeaderBox from '.././Components/HeaderBox';
import Sidebar from '../Components/Sidebar';
// Used to navigate between web pages
import { useNavigate } from 'react-router-dom';
// solid background image for website
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
import { useCookies } from "react-cookie";
import { useTheme } from '@mui/material/styles';
import * as themes from '.././Config';
import darkModeImg from './dark.png';
import lightModeImg from './light.png';

function UserAccountSettings({ themeToggle }) {

    // fetches the user set dark theme preference from cookie
    const [getTheme] = useCookies(["theme"]);
    const [isDarkMode, setIsDarkMode] = useState(getTheme.theme === 'dark');

    // Handles the page's button presses (temporarily)
    const navigate = useNavigate();
    const goToHome = () => {
        // Use navigate to go to the UserProfile page
        navigate("/Home");
    }
    const handleChangePasswordClick = () => {
        navigate('/ChangePassword');
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


    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
        themeToggle(!isDarkMode);
        themes.DarkmodeToggle(!isDarkMode);
        //setCheck(!isDarkMode);
        // Here you would also include any logic to actually change the theme.
    };

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

            <Sidebar />
            {/* Container and Grid organizes HeaderBox and Buttons */}
            <Container maxWidth='sm' style={{ background: containerColor, marginTop: '75px', height: '500px', marginBottom: '75px' }} >
                <Grid container spacing={5}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">

                    <Grid item xs={12} sx={{ width: '100%', padding: 0, display: 'flex', justifyContent: 'center' }}>
                        <HeaderBox text={'Account Settings'} sx={{ maxWidth: '100%', padding: 0, margin: '0 auto' }} />
                    </Grid>


                    <Grid item xs={2}>
                        <Button size="small" onClick={handleChangePasswordClick} style={{ color: textColor, width: '200px', background: buttonColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%' }} >
                            Change Password
                        </Button>
                    </Grid>


                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: buttonColor,
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
                                    color: textColor,
                                    fontFamily: 'Courier New',
                                }}
                            >
                                CHANGE THEME
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Button size="small" onClick={goToHome} style={{ color: textColor, width: '250px', background: buttonColor }} sx={{ fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%' }} >
                            Return to Home
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>

    );
}
export default UserAccountSettings;