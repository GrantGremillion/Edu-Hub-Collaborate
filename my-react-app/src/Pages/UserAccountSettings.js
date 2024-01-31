// The react framework
import React, {useState} from 'react';
// Material UI components
// FormGroup and FormControlLabel are needed for switches with text.
import {Button, Grid, Container, Box, Switch, FormGroup, FormControlLabel} from '@mui/material';
// Premade components we set up and put in the Components folder for reusability
import HeaderBox from '.././Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar'
// Used to navigate between web pages
import { useNavigate } from 'react-router-dom';
// solid background image for website
import bg from '.././Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
import * as DarkOptions from '.././Config';
import GoBackButton from '../Components/GoBackButton';


function UserAccountSettings() {

    // Handles the page's button presses (temporarily)
    const navigate = useNavigate();
    const handleClick = () => {
        // Use navigate to go to the UserProfile page
        alert('Placeholder: No backend settings implemented yet!');
    }
    const goToProfile = () => {
        // Use navigate to go to the UserProfile page
        navigate("/UserProfile");
    }

    // initialize darkmode switch's state with false
    const [check, setCheck] = useState(false);

    // handle's the change of the switch
    function handleChange() {
        setCheck((prevCheck) => !prevCheck);    // this actually toggles the switch's state
        DarkOptions.darkmodeToggle();
    }

    // darkmode webpage (it's blank right now, don't be alarmed.)
    if (DarkOptions.DARKMODE) {
        return (
            <div>
                {/* Box used to display background image - bg.jpg */}
                <Box
                    className="bg"
                    style={{
                    backgroundImage: `url(${dark_bg})`,
                    backgroundSize: "cover",
                    zIndex: '-1',
                    position: 'fixed', // Make sure it covers the whole viewport
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    }}>
                </Box>
            
                <PlainNavBar text='Edu Hub Collaborate'></PlainNavBar >
                {/* Container and Grid organizes HeaderBox and Buttons */}
                <Container maxWidth='sm' style={{ background: '#216E6B', marginTop: '75px', height: '700px', marginBottom:'75px'}} >
                    <Grid container spacing={5}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                        <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
                            <HeaderBox text={'Account Settings'}></HeaderBox>
                        </Grid>

                        {/* Creates buttons and sliders. */}
                        <Grid item xs={1}>
                            <Button size="small"  onClick={handleClick} style={{ color: 'white', width: '250px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                                Change Display Name
                            </Button>
                        </Grid>

                        <Grid item xs={2}>
                            <Button size="small"  onClick={handleClick} style={{ color: 'white', width: '200px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                                Change Password
                            </Button>
                        </Grid>
            
                        <Grid item xs={3}>

                            <Box
                                sx={{
                                width: 200,
                                height: 40,
                                borderRadius: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                fontSize: '2rem', 
                                bgcolor: '#009688',
                                color: 'primary.white',
                                zIndex: '0',
                                fontFamily: 'Courier New',
                                // the below comment is to prevent a warning message from showing
                                // eslint-disable-next-line
                                fontSize: 30
                                }}>

                                <FormGroup>
                                    <FormControlLabel control={<Switch onChange={handleChange} checked={check} color='default' />} label="Dark Theme" fontFamily='Courier New' sx={{fontFamily: 'Courier New', color: 'white'}} />
                                </FormGroup>

                            </Box>

                            
                        </Grid>

                        <Grid item xs={4}>
                            <Button size="small"  onClick={goToProfile} style={{ color: 'white', width: '250px', background: '#009688'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                                Return to Profile
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        
        );
    }
    // Normal webpage
    else {
        return (
            <div>
            {/* Box used to display background image - bg.jpg */}
            <Box
                className="bg"
                style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                zIndex: '-1',
                position: 'fixed', // Make sure it covers the whole viewport
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                }}>
            </Box>
        
            <PlainNavBar text='Edu Hub Collaborate'></PlainNavBar >
            {/* Container and Grid organizes HeaderBox and Buttons */}
            <Container maxWidth='sm' style={{ background: '#e0f2f1', marginTop: '75px', height: '700px', marginBottom:'75px'}} >
                <Grid container spacing={5}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">
                    <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px'}}>
                        <HeaderBox text={'Account Settings'}></HeaderBox>
                    </Grid>

                    {/* Creates buttons and sliders. */}
                    <Grid item xs={1}>
                        <Button size="small"  onClick={handleClick} style={{ color: 'black', width: '250px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Change Display Name
                        </Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Button size="small"  onClick={handleClick} style={{ color: 'black', width: '200px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Change Password
                        </Button>
                    </Grid>
        
                    <Grid item xs={3}>
                        <Box
                            sx={{
                            width: 200,
                            height: 40,
                            borderRadius: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            fontSize: '2rem', 
                            bgcolor: '#b2dfdb',
                            color: 'primary.white',
                            zIndex: '0',
                            fontFamily: 'Courier New',
                            // the below comment is to prevent a warning message from showing
                            // eslint-disable-next-line
                            fontSize: 30
                            }}>
                            <FormGroup>
                                <FormControlLabel control={<Switch onChange={handleChange} checked={check} color='default'/>} label="Dark Theme" sx={{fontFamily: 'Courier New', color: 'black'}}/>
                            </FormGroup>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Button size="small"  onClick={goToProfile} style={{ color: 'black', width: '250px', background: '#b2dfdb'}} sx={{fontFamily: 'Courier New', fontSize: 'large', marginTop: '0%'}} >
                            Return to Profile
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <GoBackButton />
                        </Grid>
                </Grid>
            </Container>
        </div>  
        ); 
    }
}
export default UserAccountSettings;