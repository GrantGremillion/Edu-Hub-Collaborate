import React, { useState } from 'react';
import { Button, Grid, Container, TextField, Box } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar';
import bg from '../Images/bg.jpg';
import dark_bg from '../Images/dark_bg.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { DARKMODE } from '../Config';

function OTPVerificationPage() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleVerifyOTP = async () => {
        if (!otp) {
          alert('Please enter the OTP.');
          return;
        }
      
        try {
          console.log('Sending OTP for verification:', otp);
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-otp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
          });
      
          if (response.ok) {
            const data = await response.json();
            alert(data.message); // "OTP verified successfully."
            navigate('/password-reset', { state: { email } }); // Navigate to the next page or perform the next action
          } else {
            const errorData = await response.json();
            console.error('Error verifying OTP:', errorData);
            alert(errorData.error || 'Failed to verify OTP.');
          }
        } catch (error) {
          console.error('Network error when verifying OTP:', error);
          alert('Network error when verifying OTP.');
        }
      };

        

      

    const backgroundImage = DARKMODE ? dark_bg : bg;
    const containerStyle = DARKMODE ? { background: '#216E6B', marginTop: '75px', height: '400px', marginBottom: '75px' }
                                    : { background: '#e0f2f1', marginTop: '75px', height: '400px', marginBottom: '75px' };

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
                        <HeaderBox text={'OTP Verification'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="otp-input"
                            label="OTP"
                            variant="filled"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ background: DARKMODE ? '#009688' : '#b2dfdb', color: 'white' }}
                            onClick={handleVerifyOTP}
                        >
                            Verify OTP
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate(-1)}
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

export default OTPVerificationPage;
