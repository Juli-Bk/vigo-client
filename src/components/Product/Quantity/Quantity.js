import React from 'react';
import { Box, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Quantity = (props) => {
  const {quantity, id, classes, handleQuantity, max} = props;

  const handleMinus = () => {
    if (quantity > 1) handleQuantity(id, quantity - 1);
  };

  const handlePlus = () => {
    if (quantity < max) handleQuantity(id, quantity + 1);
  };

  return (
    <Box className={classes.quantityBox}>
      <Box className={classes.borderRight} onClick={handleMinus}>
        <RemoveIcon className={classes.btn}/>
      </Box>
      <Typography variant='caption'
        className={classes.active}>
        {quantity}
      </Typography>
      <Box className={classes.borderLeft} onClick={handlePlus}>
        <AddIcon className={classes.btn}/>
      </Box>
    </Box>
  );
};

export default React.memo(Quantity);