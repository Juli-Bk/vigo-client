import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { ThemeProvider } from '@material-ui/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from './TabSliderStyles';
import ProductGridView from '../Product/ProductGridView/ProductGridView';
import { defineVisibleSlides } from '../../helpers/helpers';
import theme from './TabsSlidersTheme';
import PropTypes from 'prop-types';

const TabSlider = (props) => {
  const {data, width} = props;
  const classes = useStyles();

  return (
    <CarouselProvider
      naturalSlideWidth={200}
      naturalSlideHeight={400}
      totalSlides={data.length}
      visibleSlides={defineVisibleSlides(width)}
      step={defineVisibleSlides(width)}
      infinite={false}
    >
      <ThemeProvider theme={theme}>
        <div className={classes.header}>
          <div className={classes.controls}>
            <ButtonBack className={classes.button}>
              <ArrowBackIosIcon className={classes.arrow}/>
            </ButtonBack>
            <ButtonNext className={classes.button}>
              <ArrowForwardIosIcon className={classes.arrow}/>
            </ButtonNext>
          </div>
        </div>
        <Slider>
          {data.map((item, index) => {
            return (
              <Slide index={index} className={classes.slide} key={index}>
                <ProductGridView productData={item} />
              </Slide>
            );
          })}
        </Slider>
      </ThemeProvider>
    </CarouselProvider>
  );
};

TabSlider.propTypes = {
  width: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default React.memo(TabSlider);