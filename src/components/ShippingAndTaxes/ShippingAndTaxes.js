import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './ShippingAndTaxesStyle';

const ShippingAndTaxes = () => {
  const styles = useStyles();

  return (
    <>
      <Typography className={styles.title} variant='h1'>Here are the available delivery options:</Typography>
      <Typography className={styles.subtitle} variant='h4'>Standard Delivery</Typography>
      <Typography className={styles.text} variant='body1'>
      Using our Standard Delivery, your order should be with you in three (3) to seven (7) working days (excludes Weekends and Public/Bank Holidays).
      </Typography>
      <Typography className={styles.subtitle} variant='h4'>Next Day Delivery</Typography>
      <Typography className={styles.text} variant='body1'>
      Place your order before 12pm Monday - Friday and receive your order within 2 to 4 days (excludes Mondays, Sundays and Public/Bank Holidays).
      </Typography>
      <Typography className={styles.text} variant='body1'>
      If you select our Next Day Delivery option, and your order is placed and accepted before 12pm Monday - Friday, we aim to have your order delivered to your door within 2 to 4 days provided the next day is not a Sunday or Bank Holiday. Orders placed after 12pm will take an extra 24 hours to deliver (excludes Mondays, Sundays and Public/Bank Holidays).
      </Typography>
      
      <Typography className={styles.title} variant='h1'>Customs and Imports Charges</Typography>
      <Typography className={styles.text} variant='body1'>
      If you order goods from our site for delivery outside the UK, they may be subject to import duties and taxes which will be levied when the order reaches the delivery address. You will be responsible for payment of any such import duties and taxes. We have no control over these charges and cannot predict their amount. For further information please contact your local customs office before placing your order.
      </Typography>
    </>
  );
};

export default ShippingAndTaxes;
