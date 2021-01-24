import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, Button,
  TableRow, Typography, TableHead, ThemeProvider, Box
} from '@material-ui/core';
import useStyles from './OrderListStyles';
import tableStyles from '../../WishListView/WishListViewStyles';
import themeMui from './OrderListTheme';
import { cancelOrder } from '../../../redux/actions/orders';
import {getPaymentStatus, getAddress, getProductsCell} from './helper';
import formStyles from '../../../styles/formStyle/formStyle';

const OrderListMobile = (props) => {
  const {userOrders, cancelOrder} = props;
  const classes = useStyles();
  const tableClasses = tableStyles();
  const formClasses = formStyles();

  return (
    <Table aria-label="products table" className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="center" className={tableClasses.tableHead}>{userOrders.length} orders</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <ThemeProvider theme={themeMui}>
          {userOrders.map(order => (
            <TableRow key={order.orderNo}>
              <TableCell component='th' scope='row'>
                <Typography className={classes.text}>
                  <span className={classes.title}>Number: </span>
                  <span style={{fontSize: '0.85rem'}}>{order.orderNo}</span>
                </Typography>
                {getProductsCell(order.products, order.products.length, classes)}
                <Typography className={classes.text}>
                  <span className={classes.title}>Email: </span>
                  {order.email}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Phone: </span>
                  {order.phoneNumber}</Typography>
                {order.deliveryAddress
                  ? <Typography className={classes.text}>
                    <span className={classes.title}>Delivery Address: </span>
                    {getAddress(order.deliveryAddress, classes)}</Typography>
                  : null
                }
                <Typography className={classes.text}>
                  <span className={classes.title}>Total: </span>
                  ${order.totalSum}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Paid: </span>
                  {getPaymentStatus(order.isPaid)}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.status}>Status: {order.status} </span>
                </Typography>
                <Box style={{textAlign: 'center'}}>
                  {order.status === 'processing'
                    ? <Button
                      className={formClasses.button}
                      onClick={() => {
                        cancelOrder(order._id);
                      }}>Cancel</Button>
                    : null}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </ThemeProvider>
      </TableBody>
    </Table>
  );
};

OrderListMobile.propTypes = {
  userOrders: PropTypes.array.isRequired,
  cancelOrder: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    userOrders: store.userOrders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelOrder: orderId => dispatch(cancelOrder(orderId))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(OrderListMobile));