import * as React from 'react';
// Material UI components
import {Container, Box} from '@mui/material';


import bg from '../Images/bg.jpg'; // Assuming this is your background image
import Sidebar from '../Components/Sidebar';
import PlainNavBar from '../Components/PlainNavBar'; // Assuming this is your custom navigation component

function TClassOptions() {

return (
  <div>
        <Box
            id="page-wrap"
            className="bg"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                zIndex: '-1',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            }}
        >
        </Box>
            <PlainNavBar text= 'Edu Hub Collaborate'></PlainNavBar>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <Container maxWidth="sm" style={{ background: '#e0f2f1', marginTop: '60px', height: '700px', marginBottom:'60px'}}>
        </Container>
    </div>
  );
}

export default TClassOptions;