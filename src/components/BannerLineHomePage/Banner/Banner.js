import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import useStyles from './BannerStyle';
import { Link } from 'react-router-dom';
import { addFilters } from '../../../redux/actions/products';

const Banner = (props) => {
  const {imageLink, title, alert, subtitle, link, filter, addFilters} = props;
  const styles = useStyles();

  return (
    <Link className={styles.link} to={link}>
      <Box className={styles.banner}
        onClick={() => addFilters(filter)}
        style={{backgroundImage: `url(${imageLink})`}}>
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
  linkText: PropTypes.string,
  filter: PropTypes.object,
  addFilters: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    addFilters: filters => dispatch(addFilters(filters))
  };
};

export default React.memo(connect(null, mapDispatchToProps)(Banner));
