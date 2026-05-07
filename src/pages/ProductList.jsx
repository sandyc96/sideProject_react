import { Grid } from '@mui/material';
import MyBreadcrumbs from '../component/product/MyBreadcrumbs';
import ProductCard from '../component/product/ProductCard';

export default function ProductList() {
  return (
    <>
      <Grid
        size={12}
        position={{ sm: 'fixed' }}
        px={2}
        top={'60px'}
        width={'100%'}
        bgcolor={'white'}
        zIndex={1}
      >
        <MyBreadcrumbs />
      </Grid>
      <Grid
        container
        direction='row'
        spacing={{ xs: 3, sm: 4 }}
        mx={{ xs: 3, sm: 4 }}
        my={{ xs: 2, sm: 7 }}
        width={{ xs: '85%', sm: '85%', md: '80%' }}
        display={{ md: 'flex' }}
        justifySelf={'center'}
      >
        <ProductCard />
      </Grid>
    </>
  );
}
