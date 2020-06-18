import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './ReturnsPolicyStyle';

const ReturnsPolicy = () => {
  const styles = useStyles();

  return (
    <>
      <Typography className={styles.title} variant='h1'>Our Return POLICY</Typography>
      <Typography className={styles.text} variant='body1'>
      We do our best to ensure all of our customers enjoy a happy shopping experience with VigoShop.com however occasionally you may need to return an item.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      We would recommend that you return your items via registered post. Please clearly state on the invoice the reason for return and whether you require a refund or exchange, We are only able to exchange items for the same product.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      Personalised Items are non-returnable. Some goods are non-returnable for hygiene reasons. Please note that this does not affect your statutory rights.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      If a full refund including the original delivery costs is required, we need to be informed fourteen (14) days after the receipt of the order. The order must be then returned to us within fourteen (14) days after we have been informed of the cancellation, however you will be responsible for the cost of returns the goods to us. If a return is payable to you we will process the refund as soon as possible and, in any case within fourteen (14) days of receipt of the original order back to us.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      The items need to be in the original packaging where it forms part of the goods, for example, boxed goods, garments and gift items). Where an item has a return policy swing ticket attached, it must still be attached and undamaged upon return. Return postage is at your own cost and risk.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      If you return goods claiming they are defective, we will examine the returned goods and will notify you of your refund via e-mail within a reasonable period of time. We will process the refund due to you as soon as possible and, in any case within thirty (30) days of the day we confirm via e-mail that you are entitled to a refund for defective goods.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      If any product purchased with a Gift Card is subsequently exchanged for a product of a lower price, any money owing will only be issued as a Gift Card. If your purchase was partially paid for on Gift Card and a refund is payable to you, your Gift Card will be refunded up to the card’s original value, any outstanding balance owed after this will be refunded via the other payment method originally used for your purchase. If you no longer have the Gift Card used to purchase the returned good(s), we will issue you with a new Gift Card to the value payable to you up to the amount of the card’s original value.
      </Typography>
    </>
  );
};

export default ReturnsPolicy;
