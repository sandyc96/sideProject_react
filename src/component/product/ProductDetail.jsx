import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  ClickAwayListener,
  Divider,
  FormControlLabel,
  FormHelperText,
  Icon,
  styled,
  ToggleButton,
  toggleButtonClasses,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  Tooltip,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MiniCartDispatchContext } from '../../context/MiniCartContext';
import { useCart } from '../../context/CartContext';
import { useAuthenticated } from '../../context/AuthenticatedContext';
import { useFormat } from '../../context/FormatContext';
import { useFavorite } from '../../context/FavoriteContext';

export default function ProductDetail({ handleClose }) {
  const miniCartDispatch = useContext(MiniCartDispatchContext);
  const { addToCart, clickedInfo } = useCart();
  const { isAuthenticated } = useAuthenticated();
  const { numFormat } = useFormat();
  const { setAddedFavorites, isAdded, addToFavorites } = useFavorite();

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    gap: '1rem',
    [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
      {
        borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
      },
    [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
      {
        borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
      },
    [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
      {
        borderLeft: `1px solid ${
          (theme.vars || theme).palette.action.disabledBackground
        }`,
      },
  }));

  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [amount, setAmount] = useState(1);

  const [openTooltip, setOpenTooltip] = useState(false);

  const Sizes = ['S', 'M', 'L'];

  if (!clickedInfo) return null;
  const handleAddToCart = () => {
    addToCart({
      ...clickedInfo,
      color,
      size,
      amount,
    });
    {
      miniCartDispatch({ type: 'open' });
    }
    if (handleClose) {
      handleClose();
    }
  };

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };
  const handleTooltipOpen = () => {
    setOpenTooltip(true);
    if (isAuthenticated && color && size) {
      addToFavorites({
        ...clickedInfo,
        color,
        size,
      });
    }
  };

  const isChecked = isAuthenticated && isAdded(clickedInfo.pname, color, size);

  const toggleChecked = (event) => {
    const currentItem = {
      ...clickedInfo,
      color,
      size,
    };
    if (event.target.checked) {
      setAddedFavorites((prevItems) => [...prevItems, currentItem]);
    } else {
      setAddedFavorites((prevItems) =>
        prevItems.filter(
          (item) =>
            !(
              item.pname === clickedInfo.pname &&
              item.color === color &&
              item.size === size
            )
        )
      );
    }
  };

  return (
    <>
      <Typography variant='h4' noWrap>
        {clickedInfo.pname}
      </Typography>
      <FormHelperText>{clickedInfo.itemNum}</FormHelperText>
      <Divider sx={{ width: { xs: '100%', md: '90%' }, my: 1 }} />
      <Typography gutterBottom sx={{ fontSize: '0.9rem' }}>
        NT$
        {numFormat(clickedInfo.price)}
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Typography gutterBottom sx={{ fontSize: 12 }}>
          顏色
        </Typography>
        <StyledToggleButtonGroup
          value={color}
          exclusive
          onChange={(e) => setColor(e.target.value)}
          size='small'
          color='primary'
        >
          <ToggleButton value={clickedInfo.color}>
            {clickedInfo.color}
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography gutterBottom sx={{ fontSize: 12 }}>
          尺寸
        </Typography>
        <StyledToggleButtonGroup
          value={size}
          exclusive
          onChange={(e) => setSize(e.target.value)}
          size='small'
          color='primary'
        >
          {Sizes.map((s) => (
            <ToggleButton key={s} value={s}>
              {s}
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </Box>
      <Box sx={{ mb: 1, width: '70%' }}>
        <Typography gutterBottom sx={{ fontSize: 12 }}>
          數量
        </Typography>
        <ButtonGroup
          variant='outlined'
          disableFocusRipple
          size='small'
          fullWidth
        >
          <Button
            value='minus'
            onClick={() =>
              setAmount((prevAmount) => Math.max(1, prevAmount - 1))
            }
            disableRipple
            sx={{
              width: 'auto',
              '&:hover': {
                borderColor: 'rgba(141, 88, 28, 0.5)',
              },
            }}
          >
            <Icon>remove_rounded</Icon>
          </Button>
          <Button
            value={amount}
            disableRipple
            fullWidth
            sx={{
              '&:hover': {
                cursor: 'default',
                bgcolor: 'transparent',
                borderColor: 'rgba(141, 88, 28, 0.5)',
              },
            }}
          >
            {amount}
          </Button>
          <Button
            value='add'
            onClick={() => setAmount((prevAmount) => prevAmount + 1)}
            disableRipple
            sx={{
              width: 'auto',
              '&:hover': {
                borderColor: 'rgba(141, 88, 28, 0.5)',
              },
            }}
          >
            <Icon>add_rounded</Icon>
          </Button>
        </ButtonGroup>
      </Box>
      <Button
        variant='contained'
        onClick={handleAddToCart}
        disabled={!color || !size || amount <= 0}
        sx={{
          display: 'block',
          mt: 2,
          mb: 1,
          width: { xs: '100%', md: '70%' },
        }}
      >
        加入購物車
      </Button>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          onClose={handleTooltipClose}
          open={openTooltip}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            !isAuthenticated &&
            (isAuthenticated ? (
              (!color || !size) && (
                <Typography sx={{ color: '#fff' }}>
                  請先選擇顏色及尺寸
                </Typography>
              )
            ) : (
              <Typography
                component={Link}
                to={'/login'}
                state={{
                  fromProduct: true,
                  pId: clickedInfo.id,
                }}
                sx={{ color: '#fff' }}
              >
                立即登入/註冊
              </Typography>
            ))
          }
          arrow
          placement='bottom'
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -15],
                  },
                },
              ],
            },
          }}
        >
          <FormControlLabel
            onClick={handleTooltipOpen}
            name='collect'
            label={
              <Typography sx={{ color: 'gray', fontSize: '14px', pr: 1.5 }}>
                加入收藏清單
              </Typography>
            }
            sx={{
              width: { xs: '100%', md: 'auto' },
              display: { xs: 'flex', md: 'inline-flex' },
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
            control={
              <Checkbox
                disableRipple
                disabled={!isAuthenticated || !color || !size}
                size='small'
                icon={<Icon>favorite_border_rounded</Icon>}
                checkedIcon={<Icon>favorite_rounded</Icon>}
                checked={isChecked}
                onChange={toggleChecked}
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
          />
        </Tooltip>
      </ClickAwayListener>
    </>
  );
}
