import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { Box } from '@material-ui/core';
import 'react-image-gallery/styles/css/image-gallery.css';
import { mapImagesForGallery } from '../../helpers/helpers';
import useStyles from './ProductSliderStyles';
import {makeStyles} from '@material-ui/core/styles';

const screenWidth = window.screen.width;

const useWidth = makeStyles(theme => ({
  galleryHeight: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down(940)]: {
      height: `calc(${screenWidth}px - ${screenWidth}px / 10)`
    },
    [theme.breakpoints.up(940)]: {
      height: 480
    }
  },
  [theme.breakpoints.down(940)]: {
    '@global .image-gallery-image': {
      height: `calc(${screenWidth}px - ${screenWidth}px / 10)`
    }
  },
  [theme.breakpoints.up(940)]: {
    '@global .image-gallery-image': {
      height: 480
    }
  }
})
);

const ProductSlider = (props) => {
  const { product } = props;
  const width = useWidth();
  const classes = useStyles();
  const ref = React.useRef();

  const toggleFullScreenBtn = () => {
    const video = ref.current;
    if (video) {
      const slide = video.parentNode.parentNode;
      // hack to avoid direct state mutation from official library`s code example
      const fullscreenBtn = document.querySelector('.image-gallery-fullscreen-button');
      if (slide.classList.contains('center')) {
        if (fullscreenBtn) fullscreenBtn.classList.add(classes.hidden);
      } else if (fullscreenBtn.classList.contains(classes.hidden)) {
        fullscreenBtn.classList.remove(classes.hidden);
      }
    }
  };

  const customRenderVideo = (item) => {
    toggleFullScreenBtn();
    return (
      <Box className={width.galleryHeight}>
        <video controls autoPlay loop ref={ref}>
          <source src={item.embedUrl} type="video/mp4"/>
        </video>
      </Box>
    );
  };

  return <ImageGallery
    items={mapImagesForGallery(product, customRenderVideo)}
    thumbnailPosition='left'
    additionalClass={classes.slider}
    showPlayButton={false}
    showFullscreenButton={true}
    showGalleryFullscreenButton={true}
    showBullets={false}
    slideOnThumbnailOver={true}
  />;
};

ProductSlider.propTypes = {
  product: PropTypes.object.isRequired
};

export default React.memo(ProductSlider);