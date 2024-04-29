import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Avatar, Container, Box, Typography, Divider, Button, Tooltip, Drawer, List, ListItem} from '@mui/material';
import ehc from '.././Images/EHC.png';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useCookies } from "react-cookie";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';



function HomeNavBar() {

  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const [cookies, setCookie, removeCookie] = useCookies(['userID','account']);
  const [getTheme, setTheme, removeTheme] = useCookies(["theme"]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);


  const [profileData, setProfileData] = useState({ displayName: '', bio: '', profilePicture: '' });

  
  const [coookies] = useCookies(['email']);

  useEffect(() => {
    if (cookies.userID === undefined){
      navigate('/Login');
    }
  }, [cookies.userID,navigate]);



  useEffect(() => {
    if (coookies.email) {
      fetch(`http://localhost:8081/getUserProfile?email=${encodeURIComponent(coookies.email)}`, {
        credentials: 'include',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setProfileData(data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }
  }, [coookies.email]);


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
    removeCookie('userID', { path: '/' });
    removeCookie('account', { path: '/' });  
    removeCookie('email', { path: '/' });
    removeTheme('theme', { path: '/' });
  }

  const handleLogoClick = () => {
    navigate('/Home');
  }
  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false); // Close the drawer when an item is clicked
  };

  const drawerList = (
    <Box onClick={() => setDrawerOpen(false)} sx={{ width: 250 }}>
      <List>
        <ListItem button onClick={() => handleNavigate('/ClassesDisplay')}>
          View Classes
        </ListItem>
        <ListItem button onClick={() => handleNavigate(cookies.account === 'student' ? '/JoinClass' : '/CreateClass')}>
          {cookies.account === 'student' ? 'Join a Class' : 'Create a Class'}
        </ListItem>
        <ListItem button onClick={() => handleNavigate('/ReportPage')}>
          Report Issues/Violations
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="static" sx={{ background: '#009688' }}>
        <Container maxWidth="xl">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <img src={ehc} onClick={() => handleNavigate('/')} alt="logo" style={{ width: '5%', marginRight: '20px', cursor: 'pointer' }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => handleNavigate('/')}>
              Edu Hub Collaborate
            </Typography>
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={() => handleNavigate('/ClassesDisplay')} sx={{ color: 'white'}}>
                  View Classes
                </Button>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                {cookies.account === 'student' ? (
                  <Button onClick={() => handleNavigate('/JoinClass')} sx={{ color: 'white' }}>
                    Join a Class
                  </Button>
                ) : (
                  <Button onClick={() => handleNavigate('/CreateClass')} sx={{ color: 'white' }}>
                    Create a Class
                  </Button>
                )}
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <Button onClick={() => handleNavigate('/ReportPage')} sx={{ color: 'white'}}>
                  Report Issues/Violations
                </Button>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    {profileData.profilePicture ? (
      <Avatar src={profileData.profilePicture} sx={{ width: '3vw', height: '3vw' }} />
    ) : (
      <AccountCircleIcon sx={{ width: '3vw', height: '3vw' }} />
    )}
  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerList}
      </Drawer>

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
        <MenuItem onClick={() => handleNavigate('/UserProfile')}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default HomeNavBar;