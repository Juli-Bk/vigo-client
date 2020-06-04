import React from 'react';
import PropTypes from 'prop-types';
import { Favorite } from '@material-ui/icons';
import { IconButton, Typography } from '@material-ui/core';

const FavoriteIcon = (props) => {
  const {classes, id, addToWishList, label} = props;
  if (label) {
    return (
      <IconButton aria-label={label} onClick={() => addToWishList(id)} className={classes.iconBtn}>
        <Favorite className={classes.icon}/>
        <Typography variant='body2' className={classes.label}>{label}</Typography>
      </IconButton>
    );
  }
  return <Favorite className={classes.icon} onClick={() => addToWishList(id)} />;
};

FavoriteIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  addToWishList: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default React.memo(FavoriteIcon);