//Made from Grants HeaderBox to make a smaller label box

import { Box, ThemeProvider } from '@mui/material';


function LabelBox({text}) {

    return (

    <div>
    
    {/* Theme proveider allows us to define multiple colors for use in our component (main and white)*/}
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#009688',
            white: '#FFFFFF'
          },
        },
      }}
    >
      <Box
        sx={{
          width: 240,
          height: 100,
          borderRadius: 1,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'center',
          fontSize: '1.5rem', 
          bgcolor: 'primary.main',
          color: 'primary.white',
          zIndex: '0',
          fontFamily: 'Courier New'
        }}
      >
        {text}
      </Box>
    </ThemeProvider>
  
    </div>

    );
  }
  
  export default LabelBox;