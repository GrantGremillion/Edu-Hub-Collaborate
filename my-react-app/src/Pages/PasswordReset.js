import React, { useState } from 'react';
import { Button, TextField, Container, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function PasswordReset() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handlePasswordReset = async () => {
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
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message); // "Password reset successfully."
                navigate('/login'); // Navigate to login page
            } else {
                const errorText = await response.text();
                throw new Error('Failed to reset password.');
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
                        label="New Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handlePasswordReset}>
                        Reset Password
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PasswordReset;
