import * as React from 'react';
// Material UI components
import {Button, Grid, Container, TextField, Box} from '@mui/material';

// Our own pre-built components in the components folder
import HeaderBox from '.././Components/HeaderBox';
import LabelBox from '.././Components/LabelBox';

import bg from '../Images/bg.jpg'; // Assuming this is your background image
import NavBar from '../Components/NavBar'; // Assuming this is your custom navigation component
import Sidebar from '../Components/Sidebar';

function TClassOptions() {

return (
  <div className="TClassOptions" id="outer-container">
          <NavBar />
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
        ></Box>
            <NavBar text= 'Edu Hub Collaborate'></NavBar>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
  </div>
  );
}

export default TClassOptions;