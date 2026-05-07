import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFormat } from '../context/FormatContext';
import { useFavorite } from '../context/FavoriteContext';
import { MiniCartDispatchContext } from '../context/MiniCartContext';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ border: '1px solid lightgray' }}
    >
      {value === index && (
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography
            component={Box}
            sx={
              ({ minHeight: '50vh' },
              [
                index == 1 && {
                  borderTop: { xs: '1px solid lightgray', md: 'none' },
                },
              ])
            }
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Account({ user }) {
  const { dateFormat, numFormat } = useFormat();
  const { addedFavorites, delFromFavorite } = useFavorite();
  const miniCartDispatch = useContext(MiniCartDispatchContext);
  const { addToCartFromFavorite, handleClickedInfo } = useCart();
  const { orderHistory } = useOrder();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleAddToCartFromFavorite = (product) => {
    addToCartFromFavorite(product);
    {
      miniCartDispatch({ type: 'open' });
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          width: '80%',
          mx: 'auto',
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            my: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          不是{user ? user.name : 'user01'}嗎?
          <Button
            href='/sideProject_react/account'
            variant='outlined'
            size='small'
            sx={{
              color: 'primary.main',
              fontSize: 12,
              px: 0,
              ml: 1,
            }}
          >
            登出
          </Button>
        </Typography>
        <AppBar
          sx={{
            position: { xs: 'fixed', sm: 'static' },
            top: 60,
            zIndex: 1,
            bgcolor: '#fff',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            sx={{ bgcolor: '#fff' }}
          >
            <Tab label='個人資訊' {...a11yProps(0)} />
            <Tab label='歷史訂單' {...a11yProps(1)} />
            <Tab label='收藏清單' {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={2} sx={{ px: 2, minHeight: '60vh' }}>
            <Grid
              component={Paper}
              size={{ xs: 12, md: 6 }}
              sx={{
                boxSizing: 'border-box',
                p: 3,
              }}
            >
              <Typography component={ListItem} sx={{ p: 0 }}>
                <Icon>assignment_ind</Icon>會員資料
              </Typography>
              <Grid container size={12} py={1}>
                <Grid size={3} display={'flex'} alignItems={'center'}>
                  <Typography variant='span'>姓名</Typography>
                </Grid>
                <Grid size={9}>
                  <TextField size='small' defaultValue={'王小美'} fullWidth />
                </Grid>
              </Grid>
              <Grid container size={12} py={1}>
                <Grid size={3} display={'flex'} alignItems={'center'}>
                  <Typography variant='span'>電子郵件</Typography>
                </Grid>
                <Grid size={9}>
                  <TextField
                    size='small'
                    defaultValue={'shopaholic20@example.com'}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container size={12} py={1}>
                <Grid size={3} display={'flex'} alignItems={'center'}>
                  <Typography variant='span'>手機號碼</Typography>
                </Grid>
                <Grid size={9}>
                  <TextField
                    size='small'
                    defaultValue={'0928282828'}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container size={12} py={1}>
                <Grid size={3}>
                  <Typography variant='span'>生日日期</Typography>
                </Grid>
                <Grid size={9}>
                  <Typography variant='span'>2000/01/01</Typography>
                </Grid>
              </Grid>
              <Grid container size={12} py={1}>
                <Grid size={3}>
                  <Typography variant='span'>密碼</Typography>
                </Grid>
                <Grid size={9}>
                  <Typography
                    component={Link}
                    to={'/account/edit'}
                    variant='span'
                    sx={{
                      color: 'initial',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    設定新的密碼
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              component={Paper}
              size={{ xs: 12, md: 6 }}
              sx={{
                boxSizing: 'border-box',
                p: 3,
              }}
            >
              <Typography component={ListItem} sx={{ p: 0 }}>
                <Icon>assignment_ind</Icon>
                送貨與付款資料
              </Typography>
              <Grid container size={12} py={1}>
                <Grid size={3} display={'flex'} alignItems={'center'}>
                  <Typography variant='span'>連絡電話 (選填)</Typography>
                </Grid>
                <Grid size={9}>
                  <TextField size='small' fullWidth placeholder='0912345678' />
                </Grid>
              </Grid>
              <Grid container size={12} py={1}>
                <Grid size={3} display={'flex'} alignItems={'center'}>
                  <Typography variant='span'>儲存的地址 (選填)</Typography>
                </Grid>
                <Grid size={9}>
                  <TextField size='small' fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Button variant='outlined'>取消</Button>
              <Button variant='outlined'>儲存設定</Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid
            container
            sx={{
              border: '1px solid lightgray',
              alignItems: 'center',
              p: 0.5,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Typography component={Grid} size={3} sx={{ fontSize: 13 }}>
              訂單號碼
            </Typography>
            <Typography component={Grid} size={3} sx={{ fontSize: 13 }}>
              訂單日期
            </Typography>
            <Typography component={Grid} size={2} sx={{ fontSize: 13 }}>
              合計
            </Typography>
            <Typography component={Grid} size={4} sx={{ fontSize: 13 }}>
              訂單狀態
            </Typography>
          </Grid>
          {orderHistory
            .map((order) => (
              <Grid
                key={order.No}
                container
                sx={{
                  border: '1px solid lightgray',
                  borderTop: 'none',
                  alignItems: 'center',
                  p: 0.5,
                }}
              >
                <Typography
                  component={Grid}
                  size={{ xs: 12, md: 3 }}
                  sx={{ fontSize: 13, pb: { xs: 0.5, md: 0 } }}
                >
                  {order.No}
                </Typography>
                <Typography
                  component={Grid}
                  size={{ xs: 12, md: 3 }}
                  sx={{ fontSize: 13, pb: { xs: 0.5, md: 0 } }}
                >
                  {dateFormat(order.date)}
                </Typography>
                <Typography
                  component={Grid}
                  size={{ xs: 12, md: 2 }}
                  sx={{ fontSize: 13, pb: { xs: 0.5, md: 0 } }}
                >
                  NT${numFormat(order.sum)}
                </Typography>
                <Grid container direction={'column'} size={{ xs: 12, md: 3 }}>
                  <Typography sx={{ fontSize: 13, pb: { xs: 0.5, md: 0 } }}>
                    {order.state[0]}
                  </Typography>
                  {order.state[1] && (
                    <Typography sx={{ fontSize: 13, pb: { xs: 0.5, md: 0 } }}>
                      {dateFormat(order.state[1])}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  size={{ xs: 12, md: 1 }}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button
                    variant='contained'
                    sx={{ fontSize: 13, width: { xs: 'auto', md: '100%' } }}
                  >
                    查閱
                  </Button>
                </Grid>
              </Grid>
            ))
            .reverse()}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid
            container
            sx={{
              alignItems: 'center',
              p: 0.5,
            }}
          >
            {addedFavorites.length === 0 ? (
              <Box sx={{ flexGrow: 1, textAlign: 'center', color: 'gray' }}>
                <Icon>favorite_border_rounded</Icon>
                <Typography sx={{ fontSize: 14 }}>目前沒有收藏商品</Typography>
              </Box>
            ) : (
              <>
                <Box>
                  <Grid
                    container
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                      alignItems: 'center',
                      py: 0.5,
                      px: 2,
                    }}
                  >
                    <Typography component={Grid} size={2} sx={{ fontSize: 13 }}>
                      商品圖
                    </Typography>
                    <Typography
                      component={Grid}
                      size={4.5}
                      sx={{ fontSize: 13 }}
                    >
                      商品資訊
                    </Typography>
                    <Typography component={Grid} size={2} sx={{ fontSize: 13 }}>
                      價格
                    </Typography>
                    <Typography
                      component={Grid}
                      size={3}
                      sx={{ fontSize: 13, pl: 1 }}
                    >
                      購買狀態
                    </Typography>
                    <Typography
                      component={Grid}
                      size={0.5}
                      sx={{ fontSize: 13, textWrap: 'nowrap' }}
                    >
                      刪除
                    </Typography>
                  </Grid>
                  <Divider
                    sx={{ mb: 1, display: { xs: 'none', sm: 'flex' } }}
                  />
                  {addedFavorites.map((item, index) => (
                    <Box key={`${item.pname}-${item.color}-${item.size}`}>
                      <Grid
                        container
                        sx={{
                          alignItems: 'center',
                          px: 2,
                          pb: 1,
                        }}
                      >
                        <Typography
                          component={Grid}
                          size={{ xs: 12, sm: 2 }}
                          sx={{
                            display: { xs: 'flex', sm: 'grid' },
                            justifyContent: 'center',
                          }}
                          onClick={() => handleClickedInfo(item)}
                        >
                          <Link to={`/new_in/${item.id}`}>
                            <img src={item.image[0]} width={'90%'} />
                          </Link>
                        </Typography>
                        <Typography
                          component={Grid}
                          size={{ xs: 12, sm: 4.5 }}
                          sx={{
                            fontSize: 13,
                            display: { xs: 'flex', sm: 'grid' },
                            justifyContent: { xs: 'center', sm: 'initial' },
                          }}
                        >
                          <ListItem
                            sx={{ width: { xs: '90%', sm: '100%' }, p: 0 }}
                          >
                            <ListItemText
                              primary={item.pname}
                              secondary={
                                <>
                                  顏色: {item.color}
                                  <br />
                                  尺寸: {item.size}
                                </>
                              }
                              slotProps={{
                                primary: { fontSize: 13 },
                                secondary: { fontSize: 11 },
                              }}
                            />
                          </ListItem>
                        </Typography>
                        <Typography
                          component={Grid}
                          size={{ xs: 12, sm: 2 }}
                          sx={{
                            fontSize: 13,
                            display: { xs: 'flex', sm: 'grid' },
                            justifyContent: { xs: 'center', sm: 'initial' },
                            alignSelf: 'center',
                          }}
                        >
                          <ListItem sx={{ width: '90%', p: 0 }}>
                            NT${numFormat(item.price)}
                          </ListItem>
                        </Typography>
                        <Typography
                          component={Grid}
                          size={{ xs: 11, sm: 3 }}
                          sx={{
                            fontSize: 13,
                            display: { xs: 'flex', sm: 'grid' },
                            justifyContent: { xs: 'center', sm: 'initial' },
                          }}
                        >
                          <ListItem sx={{ width: '90%', p: 0 }}>
                            {item.state === 'unavailable' ? (
                              '已售完'
                            ) : (
                              <Button
                                variant='outlined'
                                size='small'
                                fullWidth
                                onClick={() =>
                                  handleAddToCartFromFavorite(item)
                                }
                              >
                                加入購物車
                              </Button>
                            )}
                          </ListItem>
                        </Typography>
                        <Typography
                          component={Grid}
                          size={{ xs: 1, sm: 0.5 }}
                          sx={{
                            fontSize: 13,
                            display: { xs: 'flex', sm: 'grid' },
                            justifyContent: { xs: 'center', sm: 'initial' },
                          }}
                        >
                          <ListItem sx={{ width: '90%', p: 0 }}>
                            <IconButton
                              disableRipple
                              onClick={() => delFromFavorite(index)}
                              sx={{
                                px: 0,
                              }}
                            >
                              <Icon sx={{ fontSize: 16 }}>delete</Icon>
                            </IconButton>
                          </ListItem>
                        </Typography>
                      </Grid>
                      {index < addedFavorites.length - 1 && (
                        <Divider
                          sx={{ mb: 1, display: { xs: 'none', sm: 'flex' } }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
}
