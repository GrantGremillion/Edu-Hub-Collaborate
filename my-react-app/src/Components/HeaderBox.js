
import { Box, ThemeProvider } from '@mui/material';


function HeaderBox({text}) {
    
    return (
        <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#1769aa',
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
          zIndex: '0'
          
        }}
      >
        {text}
      </Box>
    </ThemeProvider>
  
    );
  }
  
  export default HeaderBox;
  