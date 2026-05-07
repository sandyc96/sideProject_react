import { Grid, Typography } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        slidesPerView={1}
        spaceBetween={0}
        modules={[Autoplay, Pagination, Navigation]}
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          position: 'relative',
          '--swiper-theme-color': '#8D591C',
          '--swiper-navigation-size': '30px',
          '--swiper-navigation-sides-offset': '30px',
          '--swiper-pagination-bullet-width': '12px',
          '--swiper-pagination-bullet-height': '12px',
        }}
      >
        <SwiperSlide>
          <Grid container>
            <img
              src='/images/banner1.jpg'
              style={{
                display: 'block',
                width: '100%',
                objectFit: 'contain',
              }}
            />
            <Typography
              sx={{
                position: 'absolute',
                bottom: '55%',
                left: '38%',
                color: '#fff',
                fontFamily: 'Vujahday Script',
                fontSize: '100px',
                display: { xs: ' none', md: 'block' },
              }}
            >
              Spring
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                bottom: '43%',
                left: '48%',
                color: '#fff',
                fontFamily: 'Vujahday Script',
                fontSize: '100px',
                display: { xs: ' none', md: 'block' },
              }}
            >
              Rain
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                bottom: '38%',
                left: '46%',
                color: '#fff',
                fontFamily: 'Vujahday Script',
                fontSize: '35px',
                display: { xs: ' none', md: 'block' },
              }}
            >
              2025.05
            </Typography>
          </Grid>
        </SwiperSlide>
        <SwiperSlide>
          <Grid container>
            <img
              src='/images/banner2.jpg'
              style={{
                display: 'block',
                width: '100%',
                objectFit: 'contain',
              }}
            />
            <Typography
              sx={{
                position: 'absolute',
                bottom: '55%',
                left: '38%',
                color: '#efe4b0',
                fontFamily: 'Dancing Script',
                fontSize: '100px',
                display: { xs: ' none', md: 'block' },
              }}
            >
              Spring
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                bottom: '44%',
                left: '48%',
                color: '#efe4b0',
                fontFamily: 'Dancing Script',
                fontSize: '100px',
                display: { xs: ' none', md: 'block' },
              }}
            >
              Day
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                bottom: '38%',
                left: '55%',
                color: '#efe4b0',
                fontFamily: 'Dancing Script',
                fontSize: '35px',
                display: { xs: ' none', md: 'block' },
              }}
            >
              2025.04
            </Typography>
          </Grid>
        </SwiperSlide>
        <SwiperSlide>
          <Grid container>
            <img
              src='/images/banner3.jpg'
              style={{
                display: 'block',
                width: '100%',
                objectFit: 'contain',
              }}
            />
            <Typography
              sx={{
                position: 'absolute',
                bottom: '65%',
                left: '46%',
                color: '#cbbb63',
                fontFamily: 'Dancing Script',
                fontSize: '35px',
                display: { xs: ' none', md: 'block' },
              }}
            >
              2025.03
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                bottom: '47%',
                left: '37.5%',
                color: '#cbbb63',
                fontFamily: 'Dancing Script',
                fontSize: '100px',
                display: { xs: ' none', md: 'block' },
              }}
            >
              Spring
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                bottom: '32%',
                left: '48%',
                color: '#cbbb63',
                fontFamily: 'Dancing Script',
                fontSize: '100px',
                display: { xs: ' none', md: 'block' },
              }}
            >
              Juant
            </Typography>
          </Grid>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
