import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import useStyles from './TopSliderStyles';
import { theme } from './TopSliderTheme';
import { Box, Button, Typography, ThemeProvider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import globalConfig from '../../globalConfig';
import keysConfig from '../../keysConfig';

const TopSlider = () => {
  const classes = useStyles();
  const {title, text, buttonText} = globalConfig.topSliderData;

  const createImagesArray = (array) => {
    return array.map(item => {
      item.renderItem = customRenderItem;
      return item;
    });
  };
  const customRenderItem = (item) => {
    return (
      <Box>
        <Box className={classes.overlay}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.text}>{text}</Typography>
          <ThemeProvider theme={theme}>
            <Link to='/products/filter?new=true'>
              <Button className={classes.button}>{buttonText}</Button>
            </Link>
          </ThemeProvider>
        </Box>
        <img src={item.original} alt='clothing' className='image-gallery-image'/>
      </Box>
    );
  };

  return (
    <Box className={classes.container}>
      <ImageGallery items={createImagesArray(globalConfig.topSliderImages)}
        showNav={true}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay={keysConfig.environment !== 'development'}
        slideDuration={800}
        slideInterval={4000}
        renderItem={customRenderItem}
      />
    </Box>
  );
};

export default React.memo(TopSlider);