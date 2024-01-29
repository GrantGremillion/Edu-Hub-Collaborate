import * as React from 'react';
import {Box} from '@mui/material';

// Our own custom-built components 
import HomeNavBar from '../Components/HomeNavBar';

// background image
import bg from '.././Images/bg.jpg';

function Home() {
  
  return (
    <div>
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
      <HomeNavBar></HomeNavBar>
    </div>
    );
  }

  export default Home;
  