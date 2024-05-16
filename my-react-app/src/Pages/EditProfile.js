import React, { useState, useEffect } from 'react';

import { Button, Grid, Container, Box, TextField, Typography } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import bg from '../Images/bg.jpg';
import dark_bg from '../Images/dark_bg.jpg';
import * as themes from '../Config';
import { useCookies } from "react-cookie";
import axiosInstance from '../helpers/axios';

function EditProfile() {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const [cookies] = useCookies(['email', 'userID']);



    useEffect(() => {
        axiosInstance.post('/account/get_profile', { ID: cookies.userID, account: cookies.account })

            // testing 
            .then(res => {
                if (res.data.Status === "Success") {
                    setDisplayName(res.data.Profile[0].name);
                    setBio(res.data.Profile[0].bio);

                }
                else {
                    alert(res.data.Status);
                }

            });
    }, []);


    // Theme handling
    const isDarkMode = themes.DARKMODE;
    const containerStyles = {
        pt: '35px', // paddingTop
        pb: '35px', // paddingBottom
        height: 'fit-content', // minHeight to handle content size
        marginTop: "50px",
        marginBottom: "50px",
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
        //width: '100%', // Full width buttons
        mt: 2, // marginTop
        fontFamily: 'Courier New',
        fontSize: 'large',
    };
    const textStyle = {
        fontFamily: 'Courier New',
        fontSize: '20px',
        textAlign: 'center',
        width: '100%',
        mb: 2,
    };

    const handleApplyChanges = async () => {

        if (displayName && bio) {
            if (displayName.length < 1 || bio.length < 1) {
                alert('Please enter a display name and or bio');
                return;
            }

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
        }

        else
        {
            alert('Please fill out all forms');
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
                <Grid container spacing={2} justifyContent="center" alignContent="center">
                    <Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <HeaderBox text={'Edit Profile'} sx={{ maxWidth: '100%' }} />
                    </Grid>

                    <Grid item xs={12} >
                        <Typography style={textStyle} sx={{ paddingBottom: "3%" }}>Change Display Name:</Typography>
                        <TextField
                            style={{ marginLeft: "25%", width: "50%" }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& > fieldset": { borderColor: "grey", borderWidth: "2px", borderRadius: 0 },
                                },
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": { borderColor: themes.darkButton, borderWidth: "2px", borderRadius: 0 },
                                },
                                "& .MuiOutlinedInput-root:hover": {
                                    "& > fieldset": { borderColor: themes.darkButton, borderWidth: "2px", borderRadius: 0 },
                                },
                                fontFamily: "Courier New",
                                backgroundColor: themes.DARKMODE ? themes.darkButton : themes.normalButton,
                            }}
                            inputProps={{ style: { color: themes.DARKMODE ? themes.darkText : themes.normalText } }}
                            InputLabelProps={{ style: { color: themes.DARKMODE ? themes.darkText : themes.normalText } }}
                            autoComplete="off"
                            placeholder="Enter your display name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <Typography style={textStyle} sx={{ paddingBottom: "1%" }}>Change Bio:</Typography>
                        <TextField
                            multiline
                            rows={4}
                            autoComplete="off"
                            placeholder="Enter your bio"
                            variant="outlined"

                            margin="normal"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            style={{ marginLeft: "12.5%", width: "75%" }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& > fieldset": { borderColor: "grey", borderWidth: "2px", borderRadius: 0 },
                                },
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": { borderColor: themes.darkButton, borderWidth: "2px", borderRadius: 0 },
                                },
                                "& .MuiOutlinedInput-root:hover": {
                                    "& > fieldset": { borderColor: themes.darkButton, borderWidth: "2px", borderRadius: 0 },
                                },
                                fontFamily: "Courier New",
                                backgroundColor: themes.DARKMODE ? themes.darkButton : themes.normalButton,
                            }}
                            inputProps={{ style: { color: themes.DARKMODE ? themes.darkText : themes.normalText } }}
                            InputLabelProps={{ style: { color: themes.DARKMODE ? themes.darkText : themes.normalText } }}
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


                    <Grid item xs={12} display='flex' justifyContent="center">
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