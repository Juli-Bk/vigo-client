import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {Box, Button, TableRow, Table, TableBody, TableCell} from '@material-ui/core';
import {Link} from 'react-router-dom';
import formStyles from '../../../styles/formStyle/formStyle';
import globalConfig from '../../../globalConfig';
import useStyles from './TotalSumStyles';
import {setTotalSum} from '../../../redux/actions/shopCart';
import {setStorageData} from '../../../helpers/helpers';
import {setCheckoutBlocked} from '../../../redux/actions/actions';

const TotalSum = (props) => {
  const {subtotal, setTotalSum, setCheckoutBlocked} = props;
  const classes = useStyles();
  const formClasses = formStyles();

  const total = useMemo(() => subtotal + globalConfig.defaultShipping + globalConfig.defaultTax, [subtotal]);

  useEffect(() => {
    setTotalSum(total);
    setStorageData('totalSum', total);
    if (total) {
      setCheckoutBlocked(false);
    } else {
      setCheckoutBlocked(true);
    }
  }, [setCheckoutBlocked, setTotalSum, total]);

  return (
    <Box className={classes.container}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow className={classes.twoBorders}>
            <TableCell className={classes.headCell}>
                Subtotal:
            </TableCell>
            <TableCell className={classes.pricesCell}>
                ${subtotal}
            </TableCell>
          </TableRow>
          <TableRow className={classes.borderBottom}>
            <TableCell className={classes.headCell}>
              Shipping (0%):
            </TableCell>
            <TableCell className={classes.pricesCell}>
              ${globalConfig.defaultShipping}
            </TableCell>
          </TableRow>
          <TableRow className={classes.borderBottom}>
            <TableCell className={classes.headCell}>
              Tax (0%):
            </TableCell>
            <TableCell className={classes.pricesCell}>
              ${globalConfig.defaultTax}
            </TableCell>
          </TableRow>
          <TableRow className={classes.borderBottom}>
            <TableCell className={classes.total}>
             Total:
            </TableCell>
            <TableCell className={classes.totalPrice}>
              ${total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button className={formClasses.button}>
        <Link to={'/checkout'} className={classes.link}>Checkout</Link>
      </Button>
    </Box>
  );
};

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTotalSum: sum => dispatch(setTotalSum(sum)),
    setCheckoutBlocked: flag => dispatch(setCheckoutBlocked(flag))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(TotalSum));