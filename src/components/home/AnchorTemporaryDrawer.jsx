import * as React from 'react';
import {
  Avatar, Box, Typography, Button, Paper, Divider, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Drawer, useMediaQuery
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RightSideDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get user data from context
  const { user, logout } = useAuth();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ right: open });
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const profile = () => (
    <Box textAlign="center" p={2}>
      <Avatar
        alt="Profile Picture"
        src="https://via.placeholder.com/150"
        sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
      />
      <Typography variant="h5" fontWeight="bold">
        {user.name || 'Guest User'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <b>{user.role || 'Visitor'}</b><br />
        {user.college || 'Welcome to AROMA'}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" fontWeight="bold">
        Contact Info: <br />
        {user.phone || 'N/A'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Email: {user.email || 'N/A'}
      </Typography>
    </Box>
  );

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {profile()} {/* Profile Section */}
      <Divider />
      <List>
        {['Webiner', 'Bookmarks', 'Chat Bot', 'Buy Plants'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 2 ? <InboxIcon /> : <MailIcon />}

              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Collection', 'Expert Support'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton color="primary" aria-label="profile" onClick={toggleDrawer(true)}>
        <AccountCircleIcon fontSize="large" sx={{ color: isMobile ? 'black' : 'white' }} />
      </IconButton>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
