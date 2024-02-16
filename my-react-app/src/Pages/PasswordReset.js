import React, { useState } from 'react';
import { Button, TextField, Container, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function PasswordReset() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // Ensure the email is passed from the previous page

    const handlePasswordReset = async () => {
        if (!password || !confirmPassword) {
            alert('Please enter all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Make sure to match these fields with your backend
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message); // "Password reset successfully."
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

    return (
        <Container>
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <TextField
                        label="New Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Confirm New Password"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handlePasswordReset}>
                        Reset Password
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PasswordReset;
