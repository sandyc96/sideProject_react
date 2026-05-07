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

export default function SignIn() {
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

  return (
    <>
      <Grid container>
        <Stack
          component={'form'}
          spacing={2}
          sx={{
            display: 'flex',
            alignContent: 'center',
            my: 10,
            width: { xs: '75vw', sm: '60vw', md: '30vw' },
            mx: 'auto',
          }}
          noValidate
          onSubmit={handleSubmit(handleAuthLogin)}
        >
          <Typography variant='h2' sx={{ textAlign: 'center' }}>
            登入
          </Typography>

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
