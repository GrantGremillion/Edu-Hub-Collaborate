import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import HeaderBox from '../Components/HeaderBox';
import bg from '../Images/bg.jpg'; // Assuming the same background image
import dark_bg from '../Images/dark_bg.jpg'; // Assuming dark theme background image
import * as themes from '../Config'; // Assuming the same theme configuration
import { useCookies } from "react-cookie";

function ChangePassword({themeToggle}) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  // fetches the user set dark theme preference from cookie
  const [getTheme] = useCookies(["theme"]);

  // initialize darkmode switch's state with DARKMODE's value
  const [check, setCheck] = useState(getTheme.theme);
  
  // Theme dependent styling
  const themeStyles = themes.DARKMODE ? {
    containerColor: themes.darkContainer,
    buttonColor: themes.darkButton,
    textColor: themes.darkText,
    background: dark_bg,
  } : {
    containerColor: themes.normalContainer,
    buttonColor: themes.normalButton,
    textColor: themes.normalText,
    background: bg,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Change password form submitted');
    // Implement your logic for changing the password here
  };

  return (
    <div>
      <Box
        className="bg"
        style={{
          backgroundImage: `url(${themeStyles.background})`,
          backgroundSize: "cover",
          zIndex: '-1',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
      </Box>

      <Sidebar/>

      <Container maxWidth='sm' style={{ background: themeStyles.containerColor, marginTop: '75px', height: '600px', marginBottom:'75px'}} >
        <Grid container spacing={5}
          direction="column"
          alignItems="center"
          justifyContent="center">

          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
            <HeaderBox text={'Change Password'}></HeaderBox>
          </Grid>

          <Grid item xs={12}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="currentPassword"
                label="Current Password"
                type="password"
                id="currentPassword"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ background: themeStyles.buttonColor, color: themeStyles.textColor }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ background: themeStyles.buttonColor, color: themeStyles.textColor }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                style={{ background: themeStyles.buttonColor, color: themeStyles.textColor }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontFamily: 'Courier New', fontSize: 'large' }}
                style={{ background: themeStyles.buttonColor, color: themeStyles.textColor }}
              >
                Change Password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ChangePassword;
