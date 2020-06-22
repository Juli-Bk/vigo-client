import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
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
import { fonts } from '../../styles/fonts/fontsKit';

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
      marginBottom: 0,
      marginRight: '2rem'
    }
  },
  button: {
    padding: '.15rem .3rem',
    color: colors.fontOncard,
    background: colors.noticeColor,
    fontFamily: fonts.f3,
    fontWeight: 'bold',
    fontSize: '.9em',
    border: `2px solid ${colors.noticeColor}`,
    transition: 'all .15s ease',
    marginBottom: '.5rem',
    '&:hover': {
      color: colors.noticeColor,
      background: colors.fontOncard,
      borderColor: colors.noticeColor
    },
    [theme.breakpoints.up(440)]: {
      marginBottom: 0
    },
    [theme.breakpoints.up('sm')]: {
      padding: '.1em .8em',
      fontSize: '1em',
      marginRight: '1rem'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      padding: '.32em .7em',
      fontSize: '.8em'
    },
    [theme.breakpoints.up(1200)]: {
      padding: '.2em 1em',
      fontSize: '.9em'
    }
  }
}));

const ModalSize = (props) => {
  const {open, setOpen, product, productsQuantity, getProductsQuantity} = props;
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
    getProductsQuantity([product._id]);
    setProductQuantity(getProductStockData(productsQuantity, product._id));
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
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <ActionButtons classes={classes} product={product} isModal={true} sizeId={sizeId}/>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = store => {
  return {
    open: store.isModalSizeOpen,
    productsQuantity: store.quantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpen: flag => dispatch(toggleModalSize(flag)),
    getProductsQuantity: (idArray) => dispatch(getProductsQuantity(idArray))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSize);