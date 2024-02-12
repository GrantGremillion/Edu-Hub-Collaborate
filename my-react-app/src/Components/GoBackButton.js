// GoBackButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import * as themes from '.././Config';

const GoBackButton = () => {
  const navigate = useNavigate();

  // Navigate back to the previous page
  const handleGoBack = () => navigate(-1);

  // checks for the theme the page is in, and applys it to these variables
  if (themes.DARKMODE) {
    var buttonColor = themes.darkButton;
    var textColor = themes.darkText;
  }
  else {
    var buttonColor = themes.normalButton;
    var textColor = themes.normalText;
  }

  return (
    <Button
      variant="contained"
      onClick={handleGoBack}
      sx={{
        color: textColor,
        background: buttonColor,
        fontFamily: 'Courier New',
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

};

export default GoBackButton;
