import { Box, ThemeProvider } from "@mui/material";

function HeaderBox({ text }) {
  return (
    <div>
      {/* Theme proveider allows us to define multiple colors for use in our component (main and white)*/}
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: "#009688",
              white: "#FFFFFF",
            },
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: '5%',
            borderRadius: 1,
            display: "flex",
            bgcolor: "primary.main",
            color: "primary.white",
            zIndex: "0",
            fontFamily: "Courier New",
            fontSize: 28,
            textAlign: 'center',
            
          }}
        >
            {text}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default HeaderBox;
