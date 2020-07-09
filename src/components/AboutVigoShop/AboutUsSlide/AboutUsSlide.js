import React from 'react';
import PropTypes from 'prop-types';
import {Slide} from 'pure-react-carousel';
import {Avatar, Typography} from '@material-ui/core';
import useStyles from './AboutUsSlideStyle';

const AboutUsSlide = (props) => {
  const aboutPlug = 'Nikola Tesla was a Serbian-American inventor, electrical engineer,' +
    ' mechanical engineer, and futurist who is best known for his contributions to the ' +
    'design of the modern alternating current electricity supply.';
  const styles = useStyles();

  const {photoUrl, name = 'Name', position = 'Doctor', about = aboutPlug, index} = props;
  return (
    <Slide index={index} className={styles.slide}>
      <Avatar className={styles.image} src={photoUrl} variant='square'/>
      <Typography className={styles.name} variant="h3">
        {name}
      </Typography>
      <Typography className={styles.position} variant="body2">
        {position}
      </Typography>
      <Typography className={styles.about} variant="body1">
        {about}
      </Typography>
    </Slide>
  );
};

AboutUsSlide.propTypes = {
  photoUrl: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.string,
  about: PropTypes.string
};

export default React.memo(AboutUsSlide);
