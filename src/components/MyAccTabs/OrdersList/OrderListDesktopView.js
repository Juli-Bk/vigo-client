import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableRow, Typography, TableHead,
  ThemeProvider, Button
} from '@material-ui/core';
import useStyles from './OrderListStyles';
import tableStyles from '../../WishListView/WishListViewStyles';
import formStyles from '../../../styles/formStyle/formStyle';
import themeMui from './OrderListTheme';
import { cancelOrder } from '../../../redux/actions/orders';
import {getPaymentStatus, getAddress, getProductsCell} from './helper';

const OrderListDesktop = (props) => {
  const {userOrders, cancelOrder} = props;
  const classes = useStyles();
  const tableClasses = tableStyles();
  const formClasses = formStyles();

  return (
    <Table aria-label="products table" className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="center" className={tableClasses.tableHead}>Order</TableCell>
          <TableCell align="center" className={tableClasses.tableHead}>Payment</TableCell>
          <TableCell align="center" className={tableClasses.tableHead}>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <ThemeProvider theme={themeMui}>
          {userOrders.map(order => (
            <TableRow key={order.orderNo + Date.now().toString()} className={classes.row}>
              <TableCell component='th' scope='row' className={classes.cell}>
                <Typography className={classes.text}>
                  <span className={classes.orderNo}>Order Number: </span>
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
              </TableCell>
              <TableCell component='th' scope='row' className={classes.cell}>
                <Typography className={classes.text}>
                  <span className={classes.title}>Total: </span>
                  ${order.totalSum}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Paid: </span>
                  {getPaymentStatus(order.isPaid)}</Typography>
              </TableCell>
              <TableCell component='th' scope='row' className={classes.rightCell}>
                <Typography className={classes.text}>
                  <span className={classes.status}>{order.status} </span>
                </Typography>
                {order.status === 'processing'
                  ? <Button
                    className={formClasses.button}
                    onClick={() => {
                      cancelOrder(order._id);
                    }}>Cancel</Button>
                  : null}
              </TableCell>
            </TableRow>
          ))}
        </ThemeProvider>
      </TableBody>
    </Table>
  );
};

OrderListDesktop.propTypes = {
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
    cancelOrder: (orderId) => dispatch(cancelOrder(orderId))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(OrderListDesktop));