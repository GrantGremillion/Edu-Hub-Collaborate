import React, { useState } from 'react';
import { Button, Grid, Container, TextField, Box } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar';
import bg from '../Images/bg.jpg';
import dark_bg from '../Images/dark_bg.jpg';
import { useNavigate } from 'react-router-dom';
import { DARKMODE } from '../Config';

function RecoverPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRequestVerification = async () => {
        if (!email) {
            alert('Please enter an email address.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // "OTP sent successfully."
                navigate('/OTPVerificationPage', { state: { email } }); // Navigate to OTP verification page
            } else {
                throw new Error(data.error || 'Failed to send OTP.');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleClickBack = () => {
        navigate('/login'); // Make sure this route is defined in your routing configuration
    };

    const backgroundImage = DARKMODE ? dark_bg : bg;
    const containerStyle = DARKMODE ? { background: '#216E6B', marginTop: '75px', height: '450px', marginBottom: '75px' }
                                    : { background: '#e0f2f1', marginTop: '75px', height: '450px', marginBottom: '75px' };

    return (
        <div>
            <PlainNavBar />
            <Box
                className="bg"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    zIndex: '-1',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
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
                            onClick={handleRequestVerification}
                        >
                            Request Verification Code
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleClickBack}
                            style={{ width: '100px', background: DARKMODE ? '#009688' : '#b2dfdb', color: 'white', marginTop: '15px' }}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default RecoverPassword;
