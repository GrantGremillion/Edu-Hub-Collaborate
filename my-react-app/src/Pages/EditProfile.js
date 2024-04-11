import React, { useState, useEffect } from 'react';

import { Button, Grid, Container, Box, TextField, Typography } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import bg from '../Images/bg.jpg';
import dark_bg from '../Images/dark_bg.jpg';
import * as themes from '../Config';
import { useCookies } from "react-cookie";

function EditProfile() {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const [cookies] = useCookies(['email']);

    
    useEffect(() => {
        // Ensure the email from cookies is available
        console.log("User's email from cookies:", cookies.email);
    }, [cookies.email]);
    

    // Theme handling
    const isDarkMode = themes.DARKMODE;
    const containerStyles = {
        pt: '75px', // paddingTop
        pb: '75px', // paddingBottom
        minHeight: '700px', // minHeight to handle content size
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDarkMode ? themes.darkContainer : themes.normalContainer,
        width: '100%', // Set the width to 100% by default
        '@media (min-width:600px)': {
          maxWidth: 'sm', // Apply 'sm' maxWidth for screens wider than 600px
        },
        // Add more media queries as needed for different breakpoints
      };
      

    const buttonStyles = {
        color: isDarkMode ? themes.darkText : themes.normalText,
        background: isDarkMode ? themes.darkButton : themes.normalButton,
        width: '100%', // Full width buttons
        mt: 2, // marginTop
        fontFamily: 'Courier New',
        fontSize: 'large',
    };
    const textStyle = {         fontFamily: 'Courier New', 
    fontSize: '20px', 
    textAlign: 'center', 
    width: '100%',
    mb: 2, };

    const handleApplyChanges = async () => {
        const formData = new FormData();
        formData.append('displayName', displayName);
        formData.append('bio', bio);
        // Assuming userEmail is the email address of the logged-in user.
        formData.append('email', cookies.email);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/account/edit-profile`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    // Don't set Content-Type when FormData is used; it sets the boundary parameter automatically
                },
            });
    
            const result = await response.json();
            if (response.ok) {
                alert('Profile updated successfully!');
                navigate('/UserProfile'); 
            } else {
                alert(`Failed to update profile: ${result.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        }
    };
    
    
    

    const handleProfilePictureChange = (event) => {
        if (event.target.files[0]) {
            setProfilePicture(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <div>
            <Box
                className="bg"
                style={{
                    backgroundImage: `url(${isDarkMode ? dark_bg : bg})`,
                    backgroundSize: "cover",
                    zIndex: -1,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            ></Box>

            <Sidebar />

            <Container maxWidth='sm' sx={containerStyles}>
                <Grid container spacing={2}>
                <Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <HeaderBox text={'Edit Profile'} sx={{ maxWidth: '100%' }} />
                </Grid>

                    <Grid item xs={12}>
                        <Typography sx={textStyle}>Change Display Name:</Typography>
                        <TextField
                            size="large"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={textStyle}>Change Bio:</Typography>
                        <TextField
                            multiline
                            rows={4}
                            placeholder="Enter your bio"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            sx={{ background: 'white', fontFamily: 'Courier New' }}
                        />
                    </Grid>

                    {preview && (
                        <Box
                            sx={{
                                mt: 2, // margin top
                                mb: 2, // margin bottom
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <img src={preview} alt="Profile Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </Box>
                    )}

                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            component="label" 
                            sx={buttonStyles} // Use buttonStyles
                        >
                            Upload Profile Picture
                            <input type="file" hidden onChange={handleProfilePictureChange} />
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            onClick={handleApplyChanges} 
                            sx={buttonStyles} // Use buttonStyles
                        >
                            Apply Changes
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default EditProfile;