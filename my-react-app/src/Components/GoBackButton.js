// GoBackButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useTheme } from '@mui/material';
import * as themes from '.././Config';

const GoBackButton = () => {
  const navigate = useNavigate();

  // Navigate back to the previous page
  const handleGoBack = () => navigate(-1);

  const theme = useTheme();

  // checks for the theme the page is in, and applys it to these variables
  const buttonColor = themes.DARKMODE ? themes.darkButton : themes.normalButton;
  const textColor = themes.DARKMODE ? themes.darkText : themes.normalText;

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
          background: theme.palette.action.hover
        },
      }}
    >
      Back
    </Button>
  );

};

export default GoBackButton;
