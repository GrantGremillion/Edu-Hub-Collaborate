// GoBackButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import {DARKMODE} from '.././Config';

const GoBackButton = () => {
  const navigate = useNavigate();

  // Navigate back to the previous page
  const handleGoBack = () => navigate(-1);

  if (DARKMODE) {
    return (
      <Button
        variant="contained"
        onClick={handleGoBack}
        sx={{
          background: '#009688', // This matches the background color from your login page
          fontFamily: 'Courier New', // This matches the font from your login page
          fontSize: 'large',
          marginTop: '25%', // Adjust spacing as needed
          '&:hover': {
            background: '#a1cbc8', // Slightly darker for the hover effect
          },
        }}
      >
        Back
      </Button>
    );
  }
  else {
    return (
      <Button
        variant="contained"
        onClick={handleGoBack}
        sx={{
          color: 'black',
          background: '#b2dfdb', // This matches the background color from your login page
          fontFamily: 'Courier New', // This matches the font from your login page
          fontSize: 'large',
          marginTop: '25%', // Adjust spacing as needed
          '&:hover': {
            background: '#a1cbc8', // Slightly darker for the hover effect
          },
        }}
      >
         Back
      </Button>
    );
  }
};

export default GoBackButton;
