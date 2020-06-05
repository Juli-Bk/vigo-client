import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconButton, Typography } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';

const FavoriteIcon = (props) => {
  const { classes, id, wishList, addToWishList, label } = props;

  if (label) {
    return (
      <IconButton aria-label={label} onClick={() => addToWishList(id)} className={classes.iconBtn}>
        <Favorite className={wishList.includes(id) ? classes.iconChosen : classes.icon}/>
        <Typography variant='body2' className={wishList.includes(id) ? classes.labelChosen : classes.label}>{label}</Typography>
      </IconButton>
    );
  }
  return <Favorite className={wishList.includes(id) ? classes.iconChosen : classes.icon} onClick={() => addToWishList(id)} />;
};

FavoriteIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  addToWishList: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string
};

const mapStateToProps = store => {
  return {wishList: store.wishList};
};

export default connect(mapStateToProps)(React.memo(FavoriteIcon));