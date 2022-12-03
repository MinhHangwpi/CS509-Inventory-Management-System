import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/**DO NOT DELETE AuthContext is important for login function later on */

import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';



const theme = createTheme();

export default function SignIn(props) {

  const navigate = useNavigate();

  const authCtx = React.useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const handleSwitch = () => {
    setIsLoggedIn((prevState) => !prevState);
  }
  // This triggers a submission no matter which mode we are in, whether it is "Sign In" or "Sign up"
  const handleSubmit = (event) => {
    event.preventDefault(); //to prevent the browser's default behavior of sending the request automatically

    //extract the entered data.
    const data = new FormData(event.currentTarget);

    //Optional: validate user input must have a correct format.

    if (isLoggedIn) {

      //replace with actual aws-amplify authentication context here
      fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          // setIsLoading(false)
          return res.json()
        })
        .then((user) => {
          authCtx.login(user.accessToken);
          console.log(props.userRole)
          //redirect the user; if the user is Manager, redirect to Manager Homepage. If the user is a corporate, redirect to Corporate "Stores" view
          //TODO: Once we get a back-end, we need to replace this clunky and error-prone logic with full-fledged role-based authorization functionality.
          {props.userRole === "Manager"? navigate('/manager/home', { replace: true }): navigate('/corporate/all_stores', { replace: true })}
        
          console.log('logged in', user.accessToken);
        })

    } else {
      // not in "login mode" means that we are in sign up mode.
      //TODO: To replace the request below (i.e. fake one to json-server-auth) to the real server i.e. AWS Cognito
      //TODO: To handle error better
      fetch('http://localhost:8080/register', {
        method: 'POST',
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          // setIsLoading(false)
          return res.json()
        })
        .then((user) => {
          console.log('registered', user)
        })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          {isLoggedIn ?
            <Typography component="h1" variant="h5">
              Sign In As {props.userRole}
            </Typography>
            :
            <Typography component="h1" variant="h5">
              Sign Up As {props.userRole}
            </Typography>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoggedIn ? "Sign In" : "Sign Up"}
            </Button>

            {/* DO NOT DELETE IN CASE WE NEED "FORGOT PASSWORD" OR "SIGN UP" FUNCTION */}
            <Grid container>
              {/* <Grid item xs>
                {isLoggedIn? <Link href="#" variant="body2">
                  Forgot password?
                </Link>: null}
              </Grid> */}
              <Grid item>
                {/* <Link 
                href="#" 
                variant="body2">
                  {isLoggedIn? "Don't have an account? Sign Up": "Sign in with an existing account"}
                </Link> */}
                <Button
                  variant="text"
                  style={{
                    textTransform: 'none'
                  }}
                  onClick={handleSwitch}
                >
                  {isLoggedIn ? "Don't have an account? Sign Up" : "Sign in with an existing account"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}