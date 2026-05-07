import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Icon,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { useCart } from '../../context/CartContext';
import { useFormat } from '../../context/FormatContext';

export default function ProductCard() {
  const { products, clickedInfo, handleClickedInfo } = useCart();
  const { numFormat } = useFormat();
  const [isHovered, setIsHovered] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handlePCardClose = () => {
    setOpen(false);
  };

  return (
    <>
      {products.map((item, index) => (
        <Grid key={index} component='div' size={{ xs: 6, sm: 6, md: 4 }}>
          <Card
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            sx={{
              position: 'relative',
              '&:hover': {
                '.addToCartButton': {
                  opacity: 1,
                },
              },
            }}
          >
            <Link
              to={`/new_in/${item.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <CardActionArea
                disableRipple={true}
                onClick={() => {
                  handleClickedInfo(item);
                }}
              >
                <CardMedia
                  component='img'
                  image={item.image[0]}
                  sx={[isHovered === index && { opacity: 0.5 }]}
                />
                <CardContent
                  sx={{
                    px: 1,
                    py: { xs: 1, md: 2 },
                    justifySelf: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <Typography
                    onMouseEnter={() => setIsHovered(index)}
                    gutterBottom
                    noWrap
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      '&:hover': {
                        animation: {
                          xs: 'marquee 2s linear',
                          sm: 'none',
                        },
                      },
                      '@keyframes marquee': {
                        '0%': { transform: 'translateX(0)' },
                        '100%': { transform: 'translateX(-25%)' },
                      },
                      maxWidth: '100%',
                      fontSize: { xs: 12, sm: 14 },
                    }}
                  >
                    {item.pname}
                  </Typography>
                  <Typography
                    onMouseEnter={() => setIsHovered(index)}
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                      fontSize: { xs: 12, sm: 14 },
                    }}
                  >
                    NT${numFormat(item.price)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
            <CardActions
              disableSpacing
              sx={{
                p: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                variant='contained'
                size='small'
                onMouseEnter={() => setIsHovered(index)}
                onClick={() => {
                  handleClick();
                  handleClickedInfo(item);
                }}
                className='addToCartButton'
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  justifySelf: 'center',
                  opacity: 0,
                  position: 'absolute',
                  bottom: { md: '23%', lg: '18%', xl: '15%' },
                  textWrap: 'nowrap',
                  width: '95%',
                  color: 'primary.main',
                  bgcolor: 'third.main',
                  '&:hover': {
                    color: '#fff',
                    bgcolor: 'primary.main',
                  },
                }}
              >
                加入購物車
              </Button>
              <Button
                onClick={() => {
                  handleClick();
                  handleClickedInfo(item);
                }}
                variant='contained'
                size='small'
                fullWidth={true}
                sx={{
                  display: { md: 'none' },
                  textWrap: 'nowrap',
                  color: 'third.main',
                  bgcolor: 'primary.light',
                  borderTopLeftRadius: '0',
                  borderTopRightRadius: '0',
                }}
              >
                <Icon>shopping_cart</Icon>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      {open ? (
        <Modal open={open} onClose={handlePCardClose}>
          <Paper
            sx={{
              p: 2,
              width: { xs: '85%', md: '60%', lg: '40%', xl: '33%' },
              maxHeight: '75vh',
              overflowY: 'auto',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              flexGrow: 1,
            }}
          >
            <Grid
              container
              sx={{ width: '100%', justifyContent: 'center' }}
              spacing={2}
            >
              <Grid
                size={{ xs: 11, sm: 6 }}
                sx={{ height: { xs: '50%', md: 'auto' } }}
              >
                <img src={clickedInfo.image[0]} width={'100%'} />
              </Grid>
              <Grid size={{ xs: 11, sm: 6 }}>
                <ProductDetail handleClose={handlePCardClose} />
              </Grid>
            </Grid>
          </Paper>
        </Modal>
      ) : null}
    </>
  );
}
