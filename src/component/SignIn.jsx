import {
  Alert,
  Button,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../context/AuthenticatedContext';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

export default function SignIn({ user, onLoginSuccess, onLogout }) {
  const { setIsAuthenticated } = useAuthenticated();

  const location = useLocation();
  const shouldShow = location.state && location.state.showAlert;
  const toProduct = location.state && location.state.fromProduct;
  const pid = location.state && location.state.pId;

  const navigate = useNavigate();
  const handleAuthLogin = () => {
    setIsAuthenticated(true);
    navigate('/account');
    if (shouldShow) {
      navigate('/cart');
    }
    if (toProduct) {
      navigate(`/new_in/${pid}`);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const userInfo = await res.json();
      onLoginSuccess(userInfo);
    },
    onError: () => console.log('登入失敗'),
  });
  return (
    <>
      <Grid container justifyContent={'center'}>
        <Stack
          component={'form'}
          spacing={2}
          sx={{
            display: 'flex',
            alignContent: 'center',
            my: 10,
            width: { xs: '75vw', sm: '60vw', md: '400px' },
            mx: 'auto',
          }}
          noValidate
          onSubmit={handleSubmit(handleAuthLogin)}
        >
          <Typography variant='h2'>登入</Typography>

          {shouldShow && (
            <Alert severity='error'>需要先登入或註冊才能繼續</Alert>
          )}
          <Controller
            name='email'
            control={control}
            rules={{
              required: '電子郵件是必須的',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Email格式不正確',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id='sign_in_email'
                name='sign_in_email'
                label='電子郵件'
                placeholder='請輸入電子郵件'
                variant='standard'
                required
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ' '}
                fullWidth
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{
              required: '密碼是必須的',
              pattern: {
                value: /^[A-Z0-9._%+-]{6,}$/i,
                message: '密碼太短',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id='sign_in_password'
                name='sign_in_password'
                label='密碼'
                placeholder='密碼(至少6個字元)'
                variant='standard'
                required
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ' '}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label={
                            showPassword
                              ? 'hide the password'
                              : 'display the password'
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge='end'
                        >
                          {showPassword ? (
                            <Icon>visibility</Icon>
                          ) : (
                            <Icon>visibility_off</Icon>
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          <a style={{ color: 'gray', fontSize: '12px', textAlign: 'left' }}>
            忘記密碼?
          </a>
          <Button
            variant='contained'
            type='submit'
            size='large'
            disabled={!isValid}
          >
            登入
          </Button>
          {user ? (
            <div>
              <img
                src={user.picture}
                width={32}
                style={{ borderRadius: '50%' }}
              />
              <span>{user.name}</span>
              <button onClick={onLogout}>登出</button>
            </div>
          ) : (
            <button
              onClick={() => login()}
              style={{
                width: '100%',
                padding: '10px 12px',
                backgroundColor: '#fff',
                color: '#3c4043',
                border: '1px solid #dadce0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Google Sans, Roboto, sans-serif',
                fontWeight: '400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg width='18' height='18' viewBox='0 0 48 48'>
                <path
                  fill='#EA4335'
                  d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
                />
                <path
                  fill='#4285F4'
                  d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
                />
                <path
                  fill='#FBBC05'
                  d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
                />
                <path
                  fill='#34A853'
                  d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
                />
              </svg>
              Google登入
            </button>
          )}
          <Typography variant='h2' sx={{ pt: 10 }}>
            還不是會員?
          </Typography>
          <Typography sx={{ color: 'gray', fontSize: '12px', py: 1 }}>
            立即註冊享有會員優惠
          </Typography>
          <Button variant='outlined' href='/sign_up' size='large'>
            註冊會員
          </Button>
        </Stack>
      </Grid>
    </>
  );
}
