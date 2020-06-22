import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {makeStyles, ThemeProvider} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ActionButtons from '../Product/ActionButtons/ActionButtons';
import SelectSimple from '../Select/SelectSimple';
import globalConfig from '../../globalConfig';
import {toggleModalSize} from '../../redux/actions/actions';
import {getProductsQuantity} from '../../redux/actions/Quantity';
import { getChosenSizeId, getProductStockData, getSizesArray, mapArrayToOptions } from '../../helpers/helpers';
import { colors } from '../../styles/colorKit';
import {button} from '../Product/ProductPageView/ProductPageViewStyles';
import theme from './ModalSelectTheme';

const useStyles = makeStyles(theme => ({
  select: {
    width: '100%',
    marginBottom: '1rem',
    padding: '.4rem 0 .4rem .3rem',
    borderColor: colors.fontFourth,
    color: colors.paginationActive,
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      width: 150,
      marginBottom: 0
    }
  },
  form: {
    textAlign: 'center'
  },
  button: {
    ...button
  },
  cancel: {
    ...button,
    color: colors.noticeColor,
    background: colors.fontOncard,
    '&:hover': {
      color: colors.fontOncard,
      background: colors.noticeColor,
      borderColor: colors.noticeColor
    }
  }
}));

const ModalSize = (props) => {
  const {open, setOpen, productsQuantity, getProductsQuantity, currentProduct} = props;
  const classes = useStyles();

  const [chosenSize, setChosenSize] = useState('');
  const [productQuantity, setProductQuantity] = useState([]);
  const sizeId = getChosenSizeId(productQuantity, chosenSize);
  const sizesArray = getSizesArray(productQuantity);

  const handleSetSize = (event) => {
    if (event.target.value !== globalConfig.defaultSizeOption) {
      setChosenSize(event.target.value);
    }
  };

  useEffect(() => {
    getProductsQuantity([currentProduct._id]);
    setProductQuantity(getProductStockData(productsQuantity, currentProduct._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenSize, productsQuantity]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Please, choose size</DialogTitle>
      <DialogContent>
        <SelectSimple value={chosenSize}
          classes={classes}
          handleChange={handleSetSize}
          options={mapArrayToOptions(sizesArray)}/>
      </DialogContent>
      <ThemeProvider theme={theme}>
        <DialogActions disableSpacing={true}>
          <Button onClick={handleClose} className={classes.cancel}>Cancel</Button>
          <ActionButtons classes={classes} product={currentProduct} isModal={true} sizeId={sizeId}/>
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );
};

const mapStateToProps = store => {
  return {
    open: store.isModalSizeOpen,
    productsQuantity: store.quantity,
    currentProduct: store.currentProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpen: flag => dispatch(toggleModalSize(flag)),
    getProductsQuantity: (idArray) => dispatch(getProductsQuantity(idArray))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSize);