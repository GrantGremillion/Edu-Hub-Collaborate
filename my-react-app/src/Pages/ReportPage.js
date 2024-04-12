import React from 'react';
import { Button, Grid, Container, Box, Typography, Divider, useTheme } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar';
import bg from '../Images/bg.jpg';
import GoBackButton from '../Components/GoBackButton';
import dark_bg from '../Images/dark_bg.jpg';
import { useNavigate } from 'react-router-dom';

// Ensure you have a Config.js file that exports DARKMODE, darkContainer, etc.
import * as themes from '../Config'; 

function ReportPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isDarkMode = themes.DARKMODE; // Assuming this is a boolean you set elsewhere
    
    // Function to handle navigation
    const handleClick = () => {
        navigate("/Home");
    };

    // Styles for the container based on the theme
    const containerStyles = {
        marginTop: theme.spacing(9),
        padding: theme.spacing(3),
        bgcolor: isDarkMode ? themes.darkContainer : themes.normalContainer,
        minHeight: 'calc(100vh - 200px)', // Accounting for nav and padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiTypography-root': { 
            fontFamily: 'Courier New', 
            fontSize: 'large', 
            textAlign: 'center', 
            marginBottom: theme.spacing(2),
        },
        '& .MuiButton-root': { 
            color: isDarkMode ? themes.darkText : themes.normalText, 
            background: isDarkMode ? themes.darkButton : themes.normalButton,
            fontFamily: 'Courier New', 
            fontSize: 'large', 
            marginTop: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(7),
            padding: theme.spacing(2),
            minHeight: 'calc(100vh - 150px)',
        },
    };

    // Styles for the background
    const backgroundStyles = {
        backgroundImage: `url(${isDarkMode ? dark_bg : bg})`,
        backgroundSize: 'cover',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    };

    const greenBackgroundColor = '#34A853';

    const headerStyles = {
        wordBreak: 'break-word',
        textAlign: 'center',
        fontSize: '1.5rem', // base size for larger screens
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.25rem', // smaller size for small screens
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem', // even smaller size for extra small screens
        },
        backgroundColor: greenBackgroundColor,
        color: theme.palette.getContrastText(greenBackgroundColor),
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    };

    return (
        <div>
            <PlainNavBar text='Edu Hub Collaborate' />
            <Box sx={backgroundStyles} />
            <Container maxWidth="sm" sx={containerStyles}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                        {/* Use Typography directly for responsive text */}
                        <Typography sx={headerStyles}>
                            Report an Issue or Violation
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {/* Typography for content */}
                        <Typography>
                            If you encounter any bugs or issues with the website, please do not hesitate to email us at eduhubcollaborate@gmail.com with information on the issue you are having. Also feel free to message us with any ideas for improvements!
                        </Typography>
                        <Divider sx={{ borderBottomWidth: 2, width: '100%' }} />
                        <Typography>
                            Since different schools have different Academic Honesty statements and requirements of their students, it is not realistically within our power to police potential cheating or Academic Dishonesty. Please contact your teacher if you suspect cheating is taking place.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {/* Button to navigate back to home */}
                        <Button onClick={handleClick} sx={{ fontFamily: 'Courier New', fontSize: 'large', width: '100%' }}>
                            Return to Home
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <GoBackButton />
        </div>
    );
}

export default ReportPage;
