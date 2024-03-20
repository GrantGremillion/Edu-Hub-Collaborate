import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Container, Box, Typography, Divider, Button, Tooltip} from '@mui/material';
import ehc from '.././Images/EHC.png';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useCookies } from "react-cookie";



function HomeNavBar() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(['userID','account']);
  const [getTheme, setTheme, removeTheme] = useCookies(["theme"]);

  useEffect(() => {
    if (cookies.userID === undefined){
      navigate('/Login');
    }
  }, [cookies.userID,navigate]);


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
    removeTheme('theme', { path: '/' });
  }

  const handleLogoClick = () => {
    navigate('/Home');
  }

  return (
    <AppBar position="static" sx={{background:'#009688', zIndex: 1 }}>
      <Container maxWidth="xl" sx={{zIndex: 0}} >
        <Toolbar>
          <img src={ehc} onClick={handleLogoClick} alt="logo" style={{width: '5%', marginLeft: '-2%', marginRight: '1%'}} />
          <Typography
            variant="h4"
            marginLeft="1%"
            marginBottom="2%"
            marginTop="2%"
            sx={{
              mr: 8,
              fontFamily: 'Corier New',
              fontSize: '125%',
              letterSpacing: '.2rem',
              
            }}>
            Edu Hub Collaborate
          </Typography>

       

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={handleViewClassesClick} sx={{fontFamily: 'Courier New', fontSize: 'small', color: 'white'}}>
              View Classes
            </Button>

            <Divider orientation="vertical" flexItem sx={{mr:'1%', ml: '1%'}}/>

            { cookies.account === 'student' ? (
            
            <Button onClick={handleJoinAClassClick} sx={{fontFamily: 'Courier New', fontSize: 'small', color: 'white'}}>
              Join a class
            </Button>

            ) : (
  
            <Button onClick={handleCreateClassClick} sx={{fontFamily: 'Courier New', fontSize: 'small', color: 'white'}}>
              Create a class
            </Button>

            )

            }
            <Divider orientation="vertical" flexItem sx={{mr:'1%', ml: '1%'}}/>
            <Button onClick={handleReportClick} sx={{fontFamily: 'Courier New', fontSize: 'small', color: 'white'}}>
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
              <MenuItem onClick={handleAccountSettingsClick}>Account Settings</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>

            </Menu>


          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HomeNavBar;