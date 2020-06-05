import React from 'react';
import {ButtonBack, ButtonNext, CarouselProvider, Slider} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {Box, Typography} from '@material-ui/core';
import useStyles from './AboutUsSliderStyle';
import AboutUsSlide from '../AboutUsSlide/AboutUsSlide';

const AboutUsSlider = () => {
  const styles = useStyles();
  const aboutPersonText = {
    avatar1: 'Gabrielle Bonheur "Coco" Chanel was a French fashion designer, and businesswoman. The founder and namesake of the Chanel brand, she was credited in the post-World War I era with liberating women from the constraints of the "corseted silhouette" and popularizing a sporty, casual chic as the feminine standard of style.',
    avatar2: 'Yves Henri Donat Mathieu-Saint-Laurent, professionally known as Yves Saint-Laurent, was a French fashion designer who, in 1961, founded his eponymous fashion label. He is regarded as being among the foremost fashion designers in the twentieth century.',
    avatar3: 'Jeanne-Marie Lanvin was a French haute couture fashion designer. She founded the Lanvin fashion house and the beauty and perfume company Lanvin Parfums.'
  };

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
        <AboutUsSlide name='Gabrielle Chanel' position='fashion designer' about={aboutPersonText.avatar1} photoUrl='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/aboutUsSlider/avatar1.jpeg' index={0}/>
        <AboutUsSlide name='Yves Saint-Laurent' position='fashion designer' about={aboutPersonText.avatar2} photoUrl='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/aboutUsSlider/avatar2.jpeg' index={1}/>
        <AboutUsSlide name='Jeanne Lanvin' position='fashion designer' about={aboutPersonText.avatar3} photoUrl='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/aboutUsSlider/avatar3.jpeg' index={2}/>
      </Slider>
    </CarouselProvider>
  );
};

export default React.memo(AboutUsSlider);
