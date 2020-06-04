import React from 'react';
import { Typography, Box } from '@material-ui/core';
import useStyles from './TextWithTitleAndLinkStyle';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TextWithTitleAndLink = (props) => {
  const {title, text, link, linkText} = props;
  const styles = useStyles();

  return (
    <Box className={styles.banner}>
      <Typography className={styles.title} variant='h2'>
        {title}
      </Typography>
      <Typography className={styles.text} variant='body1'>
        {text}
      </Typography>
      <Link className={styles.link} to={link}>{linkText}</Link>
    </Box>
  );
};

TextWithTitleAndLink.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default React.memo(TextWithTitleAndLink);
