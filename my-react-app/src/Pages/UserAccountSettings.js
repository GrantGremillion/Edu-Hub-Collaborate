import * as React from 'react';
import {Button, Grid} from '@mui/material';
import HeaderBox from '.././Components/HeaderBox';

function UserAccountSettings() {

    return (
    <Grid container spacing={4}
        direction="column"
        alignItems="center"
        justifyContent="center">
        <Grid item xs={1}>
            <HeaderBox text={'Edu Collaborate'}></HeaderBox>
        </Grid>
        <Grid item xs={2}>
            <Button variant="contained" color="primary" size="large"  onClick={() => {alert('Placeholder');}} style={{ width: '200px' }} >
                Option 1
            </Button>
        </Grid>
        <Grid item xs={3}>
            <Button variant="contained" color="primary" size="large"  onClick={() => {alert('Placeholder');}} style={{ width: '200px' }} >
                Option 2
            </Button>
        </Grid>
    </Grid>
    );
}

export default UserAccountSettings;