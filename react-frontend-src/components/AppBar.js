import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuListComposition from './MenuList.js';
import AuthContext from '../store/auth-context.js';
import { useNavigate } from 'react-router-dom';

function CustomAppBar() {
  const authCtx = React.useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const navigate = useNavigate();

  const handleLogout = () => {
    authCtx.logout();
    //redirect to Customer Landing page
    navigate('/', {replace: true});
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuListComposition />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Switch User Role
          </Typography>

          { /* TODO: the login button must changed to "logged in once an user has logged in" */}
          {isLoggedIn ? <Button color="inherit" onClick={handleLogout}>Logout</Button> : <Button color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CustomAppBar;