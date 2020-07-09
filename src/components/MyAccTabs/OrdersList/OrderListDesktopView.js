import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell,
  TableRow, Typography, TableHead, ThemeProvider
} from '@material-ui/core';
import useStyles from './OrderListStyles';
import tableStyles from '../../WishListView/WishListViewStyles';
import themeMui from './OrderListTheme';
import CloseIcon from '@material-ui/icons/Close';
import { deleteOrder } from '../../../redux/actions/orders';
import {getPaymentStatus, getAddress, getProductsCell} from './helper';

const OrderListDesktop = (props) => {
  const {userOrders, deleteOrder, user} = props;
  const classes = useStyles();
  const tableClasses = tableStyles();

  return (
    <Table aria-label="products table" className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="center" className={tableClasses.tableHead}>Order</TableCell>
          <TableCell align="center" className={tableClasses.tableHead}>Products</TableCell>
          <TableCell align="center" className={tableClasses.tableHead}>Client</TableCell>
          <TableCell align="center" className={tableClasses.tableHead}>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <ThemeProvider theme={themeMui}>
          {userOrders.map(order => (
            <TableRow key={order.orderNo}>
              <TableCell component='th' scope='row' className={classes.cell}>
                <Typography className={classes.text}>
                  <span className={classes.title}>Number: </span>
                  <span style={{fontSize: '0.85rem'}}>{order.orderNo}</span>
                </Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Shipping: </span>
                  {order.shipping}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Total: </span>
                    ${order.totalSum}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Payment: </span>
                  {order.paymentInfo}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Paid: </span>
                  {getPaymentStatus(order.isPaid)}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Status: </span>
                  {order.status}</Typography>
              </TableCell>
              <TableCell component='th' scope='row' className={classes.cell}>
                {getProductsCell(order.products, order.products.length, classes)}
              </TableCell>
              <TableCell component='th' scope='row' className={classes.cell}>
                <Typography className={classes.text}>
                  <span className={classes.title}>Name: </span>
                  {order.userName}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Email: </span>
                  {order.email}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Phone number: </span>
                  {order.phoneNumber}</Typography>
                <Typography className={classes.text}>
                  <span className={classes.title}>Delivery Address: </span>
                  {getAddress(order.deliveryAddress, classes)}</Typography>
              </TableCell>
              <TableCell component='th' scope='row' align='center' className={classes.cell}>
                <CloseIcon
                  className={tableClasses.closeIcon}
                  onClick={() => {
                    deleteOrder(order._id, user._id);
                  }}/>
              </TableCell>
            </TableRow>
          ))}
        </ThemeProvider>
      </TableBody>
    </Table>
  );
};

OrderListDesktop.propTypes = {
  user: PropTypes.object.isRequired,
  userOrders: PropTypes.array.isRequired,
  deleteOrder: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    userOrders: store.userOrders,
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOrder: (orderId, userId) => dispatch(deleteOrder(orderId, userId))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(OrderListDesktop));