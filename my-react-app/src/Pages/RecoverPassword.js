import React, { useState } from 'react';
import { Button, Grid, Container, TextField, Box } from '@mui/material';
import HeaderBox from '../Components/HeaderBox'; // Assuming this is your custom header component
import PlainNavBar from '../Components/PlainNavBar'; // Assuming this is your custom navigation component
import bg from '../Images/bg.jpg'; // Assuming this is your background image
// Using the same navigation functionality
import { useNavigate } from 'react-router-dom';
// used to handle user toggled dark mode
import dark_bg from '.././Images/dark_bg.jpg';
import {DARKMODE} from '.././Config';

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

    if (DARKMODE) {
        return (
            <div>
                <PlainNavBar />
                <Box
                    className="bg"
                    style={{
                        backgroundImage: `url(${dark_bg})`,
                        backgroundSize: "cover",
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
    
                <Container maxWidth="sm" style={{ background: '#216E6B', marginTop: '75px', height: '400px', marginBottom:'75px'}}>
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
                                style={{ background: '#009688', color: 'white' }}
                                onClick={handleRequestVerification}
                            >
                                Request Verification Code
                            </Button>
                        </Grid>
    
                        <Grid item xs={1}>
                            <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '-15%', marginLeft: '-225%'}} >
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
    else {
        return (
            <div>
                <PlainNavBar />
                <Box
                    className="bg"
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
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
    
                <Container maxWidth="sm" style={{ background: '#e0f2f1', marginTop: '75px', height: '400px', marginBottom:'75px'}}>
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
                        {/* original button background = #004d40 */}
                        <Grid item xs={12}>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                style={{ background: '#b2dfdb', color: 'white' }}
                                onClick={handleRequestVerification}
                            >
                                Request Verification Code
                            </Button>
                        </Grid>
    
                        <Grid item xs={1}>
                            <Button variant="contained" size="small"  onClick={handleClickBack} style={{ width: '100px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '-15%', marginLeft: '-225%'}} >
                                Back
                            </Button>
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
    
}

export default RecoverPassword;
