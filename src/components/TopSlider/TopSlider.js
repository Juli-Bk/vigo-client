import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import useStyles from './TopSliderStyles';
import {Box, Button, Typography} from '@material-ui/core';

// todo working button Take Look (getProductsByFilters, filter take from new arrivals)

const TopSlider = (props) => {
  const {imgUrls, renderData} = props;
  const classes = useStyles();

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
          <Typography variant='h2' className={classes.title}>{renderData.title}</Typography>
          <Typography variant='subtitle1' className={classes.text}>{renderData.text}</Typography>
          <Button className={classes.button}>{renderData.buttonText}</Button>
        </Box>
        <img src={item.original} alt='clothing' className='image-gallery-image'/>
      </Box>
    );
  };

  return (
    <Box className={classes.container}>
      <ImageGallery items={createImagesArray(imgUrls)}
        showNav={true}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay={false}
        renderItem={customRenderItem}
      />
    </Box>
  );
};

export default TopSlider;