import React, { useState } from 'react';
import { Button, TextField, Container, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function OTPVerificationPage() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // Make sure the email is being passed correctly in state

    const handleVerifyOTP = async () => {
        if (!otp) {
            alert('Please enter the OTP.');
            return;
        }

        try {
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
                navigate('/password-reset', { state: { email } }); // Navigate to the password reset page
            } else {
                const errorText = await response.text();
                console.log('Error verifying OTP:', errorText);
                throw new Error(errorText || 'Failed to verify OTP.');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container>
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                <Grid item>
                    <TextField
                        label="OTP"
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="number"
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleVerifyOTP}>
                        Verify OTP
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default OTPVerificationPage;
