import * as React from 'react';
import {Button, Grid} from '@mui/material';
import HeaderBox from '.././Components/HeaderBox';


function UserProfile() {

return (
    <div className="App">

        <Grid container spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Grid item xs={1}>
                <HeaderBox text="User Profile" />
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="primary" size="large"  onClick={() => {alert('would edit profile');}} style={{ width: '200px' }} >
                    Edit Profile
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" color="primary" size="large"  onClick={() => {alert('opens settings :D');}} style={{ width: '200px' }} >
                    Settings
                </Button>
            </Grid>
        </Grid>
    

    </div>
    );
}

export default UserProfile;