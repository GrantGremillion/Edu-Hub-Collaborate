import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useNavigate } from 'react-router-dom';

const settings = ['User Profile', 'Account Settings', 'Logout'];

function HomeNavBar() {
  const navigate = useNavigate();
  // The below comment is here to prevent a warning from appearing in the terminal.
  // eslint-disable-next-line
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }
  // Replaced the handleCloseUserMenu onClick in the actual menu part below, this
  // can be changed later of course. It's just for the presentation tomorrow.
  const handleUserProfileClick = () => {
    navigate('/UserProfile');
  }

  const handleViewClassesClick = () => {
    // Use navigate to go to the TClass page
    navigate('/TClassOptions');
  }

  const handleJoinAClassClick = () => {
    // Use navigate to go to the Join Class page
    navigate('/JoinClass');
  }

  const handleSettingsClick = () => {
    // Use navigate to go to the {doesnt exist(?)} page
    alert('needs implementation')
  }

  const handleReportClick = () => {
    navigate('/ReportPage');
  }

  return (
    <AppBar position="static" sx={{background:'#009688'}}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h4"
            marginLeft="-3%"
            marginBottom="2%"
            marginTop="2%"
            sx={{
              mr: 8,
              fontFamily: 'Corier New',
              fontSize: '225%',
              letterSpacing: '.2rem',
            }}>
            Edu Hub Collaborate
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={handleViewClassesClick} sx={{mr: 5, fontFamily: 'Courier New', fontSize: 'large', color: 'white'}}>
              View Classes
            </Button>
            <Button onClick={handleJoinAClassClick} sx={{mr: 5, fontFamily: 'Courier New', fontSize: 'large', color: 'white'}}>
              Join a class
            </Button>
            <Button onClick={handleSettingsClick} sx={{mr: 5, fontFamily: 'Courier New', fontSize: 'large', color: 'white'}}>
              Settings
            </Button>
            <Button onClick={handleReportClick} sx={{fontFamily: 'Courier New', fontSize: 'large', color: 'white'}}>
              Report Issues/Violations
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ width: '3vw', height: '3vw' }}></AccountCircleIcon>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleUserProfileClick}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HomeNavBar;