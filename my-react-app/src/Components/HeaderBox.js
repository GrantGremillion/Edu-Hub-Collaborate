
import { Box, ThemeProvider } from '@mui/material';


function HeaderBox({text}) {

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
          width: 500,
          height: 100,
          borderRadius: 1,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          fontSize: '2rem', 
          bgcolor: 'primary.main',
          color: 'primary.white',
          zIndex: '0',
          fontFamily: 'Courier New',
          fontSize: 30
        }}
      >
        {text}
      </Box>
    </ThemeProvider>
  
    </div>

    );
  }
  
  export default HeaderBox;
  