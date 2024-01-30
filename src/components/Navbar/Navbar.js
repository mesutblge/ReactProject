import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
function Navbar() {
  let userId = 5;
  return (
    <div>
      <Box>
        <AppBar position="static">
          <Toolbar sx={{ flexGrow: 1, textAlign: 'left' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link className="link" to={'/'}>
                Home
              </Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link className="link" to={{ pathname: '/users/' + userId }}>
                User
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
