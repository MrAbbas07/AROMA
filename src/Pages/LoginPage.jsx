import React, { useState } from 'react';
import GrassIcon from '@mui/icons-material/Grass';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Stack, Button, Divider, Link, TextField, Typography, Box, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, MenuItem, useTheme, useMediaQuery, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { registerUser, loginUser } from '../services/ApiClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {

  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const Categories = [
    { value: 'Student', label: 'Student' },
    { value: 'Researcher', label: 'Researcher' },
    { value: 'Enthusiast', label: 'Enthusiast' },
    { value: 'Educator', label: 'Educator' }
  ];

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    college: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      let response;
      if (isLogin) {
        response = await loginUser(userDetails.email, userDetails.password);
      } else {
        response = await registerUser(userDetails);
      }
      console.log('Success:', response);
      login(response); // Use context login
      navigate('/home'); // Redirect to home/dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || 'An error occurred');
    }
  };

  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <Stack maxWidth={'30rem'} gap={'3px'} sx={{ p: '8px 26px' }} justifyContent={'center'} alignItems={'center'}>
      <GrassIcon sx={{ fontSize: isMobile ? '35px' : '50px', color: 'green' }} />
      <Typography variant={isMobile ? "h5" : 'h4'} color='success' textAlign={'center'}>
        AROMA 3D Virtual Herbal
      </Typography>
      <Typography variant={isMobile ? "h5" : 'h4'} color='success' textAlign={'center'}>
        Garden
      </Typography>
      <Typography color='#1cce39'>
        Connect with nature, digitally
      </Typography>

      {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

      <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
        {!isLogin && (
          <TextField
            name='name'
            label="Name"
            size='small'
            color='success'
            value={userDetails.name}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
        )}
        <TextField
          size='small'
          name='email'
          label="Email"
          color='success'
          value={userDetails.email}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <FormControl variant="outlined" size='small' fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="password" color='success'>Password</InputLabel>
          <OutlinedInput
            id="password"
            name='password'
            label="Password"
            color='success'
            value={userDetails.password}
            onChange={handleInputChange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                  color='success'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {!isLogin && (
          <>
            <TextField
              size='small'
              name='role'
              color='success'
              label="Role"
              value={userDetails.role}
              onChange={handleInputChange}
              fullWidth
              select
              required
              sx={{ mb: 2 }}
            >
              {Categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name='college'
              label="College/Institution"
              size='small'
              color='success'
              value={userDetails.college}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name='phone'
              label="Phone Number"
              size='small'
              color='success'
              value={userDetails.phone}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </>
        )}

        <Button type="submit" variant='contained' color='success' fullWidth>
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </form>

      <Link variant='body2' color='success' mt={2}>
        Forget Password?
      </Link>
      <Divider sx={{ width: '100%', margin: '8px 0px' }}>
        <Typography color="success" sx={{ px: 1, backgroundColor: 'white' }}>
          Or continue with
        </Typography>
      </Divider>
      <Box display={'flex'} gap={'20px'} width={'-webkit-fill-available'}>
        <Button color='success' fullWidth variant='outlined' startIcon={<GoogleIcon />}>Google</Button>
        <Button color='success' fullWidth variant='outlined' startIcon={<FacebookIcon />}>Facebook</Button>
      </Box>
      <Typography color='success' mt={2}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link
          component="button"
          color='success'
          fontWeight={'bold'}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Create an Account' : 'Login'}
        </Link>
      </Typography>
    </Stack>
  );
}

export default LoginPage;
