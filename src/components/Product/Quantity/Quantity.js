import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Quantity = (props) => {
  const {quantity, id, classes, handleQuantity, max} = props;

  const handleMinus = useCallback(() => {
    if (quantity > 1) handleQuantity(id, quantity - 1);
  }, [handleQuantity, id, quantity]);

  const handlePlus = useCallback(() => {
    if (quantity < max) handleQuantity(id, quantity + 1);
  }, [handleQuantity, id, max, quantity]);

  return (
    <Box className={classes.quantityBox}>
      <Box className={classes.borderRight} onClick={handleMinus}>
        <RemoveIcon className={classes.btn}/>
      </Box>
      <Typography variant='caption'
        className={classes.active}
        id='quantity'>
        {quantity}
      </Typography>
      <Box className={classes.borderLeft} onClick={handlePlus}>
        <AddIcon className={classes.btn}/>
      </Box>
    </Box>
  );
};

Quantity.propTypes = {
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleQuantity: PropTypes.func.isRequired,
  max: PropTypes.number
};

export default React.memo(Quantity);