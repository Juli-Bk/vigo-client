import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {makeStyles, ThemeProvider} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ActionButtons from '../Product/ActionButtons/ActionButtons';
import SelectBox from '../SelectBox/SelectBox';
import globalConfig from '../../globalConfig';
import { toggleModalSize } from '../../redux/actions/actions';
import {getProductsQuantity} from '../../redux/actions/quantity';
import {
  getChosenSizeId,
  getColorData,
  getProductStockData,
  getSizesArray,
  mapArrayToOptions
} from '../../helpers/helpers';
import { colors } from '../../styles/colorKit';
import theme from './ModalSelectTheme';
import formStyles from '../../styles/formStyle/formStyle';

const useStyles = makeStyles(theme => ({
  select: {
    width: '100%',
    marginBottom: '1rem',
    padding: '.4rem 0 .4rem .3rem',
    borderColor: colors.fontFourth,
    color: colors.paginationActive,
    fontSize: '1.2rem',
    [theme.breakpoints.up('sm')]: {
      width: 150,
      marginBottom: 0
    }
  },
  form: {
    textAlign: 'center'
  }
}));

const ModalSize = (props) => {
  const {open, setOpen, productsQuantity, getProductsQuantity, currentProduct} = props;
  const classes = useStyles();
  const formClasses = formStyles();

  const [chosenSize, setChosenSize] = useState('');
  const [productQuantity, setProductQuantity] = useState([]);
  const sizeId = getChosenSizeId(productQuantity, chosenSize);
  const sizesArray = useMemo(() => getSizesArray(productQuantity), [productQuantity]);
  const color = useMemo(() => getColorData(productQuantity), [productQuantity]);

  const handleSetSize = useCallback((event) => {
    if (event.target.value !== globalConfig.defaultSizeOption) {
      setChosenSize(event.target.value);
    }
  }, []);

  useEffect(() => {
    getProductsQuantity([currentProduct._id]);
    const quantityOfCurrentProduct = getProductStockData(productsQuantity, currentProduct._id);
    setProductQuantity(quantityOfCurrentProduct);
  }, [chosenSize, productsQuantity, getProductsQuantity, currentProduct._id]);

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
      <DialogTitle
        id="alert-dialog-title"
        className={formClasses.header}>
        Please, choose size
      </DialogTitle>
      <DialogContent>
        <SelectBox
          value={chosenSize}
          classes={classes}
          handleChange={handleSetSize}
          options={mapArrayToOptions(sizesArray)}/>
      </DialogContent>
      <ThemeProvider theme={theme}>
        <DialogActions disableSpacing={true}>
          <Button onClick={handleClose} className={formClasses.button}>Cancel</Button>
          <ActionButtons
            classes={formClasses}
            isModalSize={true}
            product={currentProduct}
            isModal={true}
            sizeId={sizeId}
            colorId={color.id}
          />
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );
};

ModalSize.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  getProductsQuantity: PropTypes.func.isRequired,
  productsQuantity: PropTypes.array.isRequired,
  currentProduct: PropTypes.object.isRequired
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

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ModalSize));