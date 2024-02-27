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

import {useCookies } from "react-cookie";


function HomeNavBar() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [removeCookie] = useCookies(['userID','account']);

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
    navigate('/ClassesDisplay');
  }

  const handleJoinAClassClick = () => {
    // Use navigate to go to the Join Class page
    navigate('/JoinClass');
  }

  const handleCreateClassClick = () => {
    // Use navigate to go to the Join Class page
    navigate('/CreateClass');
  }

  const handleAccountSettingsClick = () => {
    navigate('/UserAccountSettings');
  }

  const handleReportClick = () => {
    navigate('/ReportPage');
  }

  const handleLogoutClick = () => {
    removeCookie('userID');
    removeCookie('account');  
    console.log("hi");
    navigate('/Login');
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
            <Button onClick={handleCreateClassClick} sx={{fontFamily: 'Courier New', fontSize: 'large', color: 'white'}}>
              Create a class
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

              <MenuItem onClick={handleUserProfileClick}>User Profile</MenuItem>
              <MenuItem onClick={ handleAccountSettingsClick}>Account Settings</MenuItem>
              <MenuItem onClick={ handleLogoutClick}>Logout</MenuItem>

            </Menu>


          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HomeNavBar;