import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar';
import bg from '../Images/bg.jpg';
import dark_bg from '../Images/dark_bg.jpg';
import { DARKMODE } from '../Config';

function PasswordReset() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // Ensure the email is passed from the previous page

    const handlePasswordReset = async () => {
        // Your password reset logic
        if (!password || !confirmPassword) {
            alert('Please enter all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        if (password.length < 6){
            alert("Password must be at least six characters");
            return
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Password reset successfully');
                navigate('/login'); // Navigate to the login page
            } else {
                const errorText = await response.text();
                console.log('Error resetting password:', errorText);
                throw new Error(errorText || 'Failed to reset password.');
            }
        } catch (error) {
            alert(error.message);
        }
    };



    // Theme-based styling
    const containerColor = DARKMODE ? '#216E6B' : '#e0f2f1';
    const buttonColor = DARKMODE ? '#009688' : '#b2dfdb';
    const backgroundImage = DARKMODE ? dark_bg : bg;

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
            <Container maxWidth="sm" style={{ background: containerColor, marginTop: '75px', height: '700px', marginBottom:'75px'}}>
                <Grid container spacing={5} direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <HeaderBox text={'Reset Your Password'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="password-input"
                            label="New Password"
                            variant="filled"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="confirm-password-input"
                            label="Confirm New Password"
                            variant="filled"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ background: buttonColor, color: 'white' }}
                            onClick={handlePasswordReset}
                        >
                            Reset Password
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate(-1)}
                            style={{ width: '100px', background: buttonColor, color: 'white', marginTop: '15px' }}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default PasswordReset;
