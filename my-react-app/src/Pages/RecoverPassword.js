import React, { useState } from 'react';
import { Button, Grid, Container, TextField, Box } from '@mui/material';
import HeaderBox from '../Components/HeaderBox'; // Assuming this is your custom header component
import PlainNavBar from '../Components/PlainNavBar'; // Assuming this is your custom navigation component
import bg from '../Images/bg.jpg'; // Assuming this is your background image
// Using the same navigation functionality
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
// used to handle user toggled dark mode
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '.././Config';
=======
import { DARKMODE } from '../Config';
>>>>>>> Stashed changes

function RecoverPassword() {
    const [email, setEmail] = useState('');
  
    const handleRequestVerification = async () => {
        // Here you would typically make an API call to your backend to handle the password recovery process
        alert('Verification code sent to your email.');
        // After requesting, you might want to navigate the user to a different page or update the state to show a message
    };

    // Navigation handler
    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate('/Login');
    }

<<<<<<< Updated upstream
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
    
=======
    const backgroundImage = DARKMODE ? dark_bg : bg;
    const containerStyle = DARKMODE ? { background: '#216E6B', marginTop: '75px', height: '400px', marginBottom: '75px' }
                                    : { background: '#e0f2f1', marginTop: '75px', height: '400px', marginBottom: '75px' };

>>>>>>> Stashed changes
    return (
        <div>
            <PlainNavBar />
            <Box
                className="bg"
                style={{
<<<<<<< Updated upstream
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
=======
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
>>>>>>> Stashed changes
                    zIndex: '-1',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
<<<<<<< Updated upstream
                    height: '100%'
                }}
            ></Box>

            <Container maxWidth="sm" style={{ background: containerColor, marginTop: '75px', height: '400px', marginBottom:'75px'}}>
                <Grid container spacing={5}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">

                    <Grid item xs={12}>
                        <HeaderBox text={'Recover Your Password'} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            fullWidth 
                            id="email-input" 
                            label="Username / Email" 
                            variant="filled" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            style={{ background: buttonColor, color: textColor }}
=======
                    height: '100%',
                }}
            ></Box>
            <Container maxWidth="sm" style={containerStyle}>
                <Grid container spacing={5} direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <HeaderBox text={'Recover Your Password'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="email-input"
                            label="Username / Email"
                            variant="filled"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ background: DARKMODE ? '#009688' : '#b2dfdb', color: 'white' }}
>>>>>>> Stashed changes
                            onClick={handleRequestVerification}
                        >
                            Request Verification Code
                        </Button>
                    </Grid>
<<<<<<< Updated upstream

                    <Grid item xs={1}>
                        <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: buttonColor, color: textColor}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '-15%', marginLeft: '-225%'}} >
=======
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleClickBack}
                            style={{ width: '100px', background: DARKMODE ? '#009688' : '#b2dfdb', color: 'white', marginTop: '15px' }}
                        >
>>>>>>> Stashed changes
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
<<<<<<< Updated upstream
    
=======
>>>>>>> Stashed changes
}

export default RecoverPassword;
