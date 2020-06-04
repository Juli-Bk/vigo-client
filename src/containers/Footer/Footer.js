import React from 'react';
import { Grid, Typography, Box, Link, ListItem } from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import useStyles from './FooterStyle';
import theme from './FooterTheme';

const Footer = () => {
  const preventDefault = (event) => event.preventDefault();

  const styles = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={styles.footer} spacing={0}>
        <Grid container className={styles.footerContainer}>

          <Grid item className={styles.gridItem} xs={12} sm={6} md={3}>
            <Box className={styles.box}>
              <Typography className={styles.title} variant='subtitle1' gutterBottom>Information</Typography>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>New products</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Top sellers</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Specials</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Manufacturers</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Suppliers</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Our stores</Link></ListItem>
            </Box>
          </Grid>
          <Grid item className={styles.gridItem} xs={12} sm={6} md={3}>
            <Box className={styles.box}>
              <Typography className={styles.title} variant='subtitle1' gutterBottom>My Account</Typography>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>My account</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Personal information</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Addresses</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Discount</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Orders history</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Your Vouchers</Link></ListItem>
            </Box>
          </Grid>
          <Grid item className={styles.gridItem} xs={12} sm={6} md={3}>
            <Box className={styles.box}>
              <Typography className={styles.title} variant='subtitle1' gutterBottom>Customer service</Typography>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Help & contact</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Shipping & taxes</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Return policy</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Careers</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Affiliates</Link></ListItem>
              <ListItem><Link href='#' onClick={preventDefault} underline='none' color='inherit' className={styles.item}>Legal Notice</Link></ListItem>
            </Box>
          </Grid>
          <Grid item className={styles.gridItem} xs={12} sm={6} md={3}>
            <Box className={styles.box}>
              <Typography className={styles.title} variant='subtitle1' gutterBottom>Contact info</Typography>
              <ListItem>Vigo Shop Ltd</ListItem>
              <ListItem>United Kingdom</ListItem>
              <ListItem>London 02587 </ListItem>
              <ListItem>Oxford Street 48/188</ListItem>
              <ListItem>Working days: Mon. - Sun.</ListItem>
              <ListItem>Working hours: 9 AM - 8 PM</ListItem>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box m={5}>
              <Typography className={styles.footerSocial} variant='body2' gutterBottom>© 2012 Powered by WooCommerce™. All Rights Reserved.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

// todo Links in Footer

export default React.memo(Footer);
