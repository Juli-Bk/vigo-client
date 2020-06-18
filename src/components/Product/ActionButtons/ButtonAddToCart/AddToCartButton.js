import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const AddToCartButton = (props) => {
  const {classes, addToCart, id} = props;
  return <Button className={classes} onClick={() => addToCart(id)}>Add to bag</Button>;
};

AddToCartButton.propTypes = {
  classes: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default React.memo(AddToCartButton);