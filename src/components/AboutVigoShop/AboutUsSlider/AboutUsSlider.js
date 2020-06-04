import React from 'react';
import {ButtonBack, ButtonNext, CarouselProvider, Slider} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {Box, Typography} from '@material-ui/core';
import useStyles from './AboutUsSliderStyle';
import AboutUsSlide from '../AboutUsSlide/AboutUsSlide';

const AboutUsSlider = () => {
  const styles = useStyles();

  return (
    <CarouselProvider className={styles.carousel} naturalSlideWidth={200} naturalSlideHeight={100} totalSlides={3} visibleSlides={1} step={1}>
      <Box className={styles.topWrapper}>
        <Typography className={styles.sliderTitle} variant="h2">our team</Typography>
        <Box className={styles.btnWrapper}>
          <ButtonBack className={styles.btn}>&#8249;</ButtonBack>
          <ButtonNext className={styles.btn}>&#8250;</ButtonNext>
        </Box>
      </Box>
      <Slider className={styles.slider}>
        <AboutUsSlide index={0}/>
        <AboutUsSlide index={1}/>
        <AboutUsSlide index={2}/>
      </Slider>
    </CarouselProvider>
  );
};

export default React.memo(AboutUsSlider);
