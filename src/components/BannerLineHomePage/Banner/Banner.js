import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import useStyles from './BannerStyle';
import { Link } from 'react-router-dom';

const Banner = (props) => {
  const {imageLink, title, alert, subtitle, link} = props;
  const styles = useStyles();

  return (
    <Link className={styles.link} to={link}>
      <Box className={styles.banner} style={{backgroundImage: `url(${imageLink})`}}>
        {subtitle &&
        <Typography className={styles.subtitle} variant='h2'>
          {subtitle}
        </Typography>
        }
        <Typography className={alert ? styles.titleAlert : styles.title} variant='h1'>
          {title}
        </Typography>
      </Box>
    </Link>
  );
};

Banner.propTypes = {
  imageLink: PropTypes.string,
  title: PropTypes.string.isRequired,
  alert: PropTypes.bool.isRequired,
  subtitle: PropTypes.string,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string
};

export default React.memo(Banner);
