import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const AddToCartButton = (props) => {
  const {classes, addToCart, id, quantity, sizeId, colorId} = props;
  return (
    <Button className={classes}
      onClick={() => addToCart(id, quantity, sizeId, colorId)}>
    Add to bag
    </Button>);
};

AddToCartButton.propTypes = {
  classes: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  sizeId: PropTypes.string
};

export default React.memo(AddToCartButton);