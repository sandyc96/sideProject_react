import { Breadcrumbs, Icon, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MyBreadcrumbs() {
  return (
    <>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{ width: '100%', py: 1.5, display: { xs: 'none', md: 'block' } }}
      >
        <Typography
          component={Link}
          to='/'
          color='inherit'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Icon>home_rounded</Icon>
          Y.C
        </Typography>
        <Typography
          color='inherit'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Icon>loyalty_rounded</Icon>
          Event
        </Typography>
        <Typography
          component={Link}
          to='/new_in'
          color='inherit'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Icon>hourglass_top_rounded</Icon>
          新品優惠95折
        </Typography>
      </Breadcrumbs>
    </>
  );
}
