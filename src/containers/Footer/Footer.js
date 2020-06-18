import React from 'react';
import { Grid, Typography, Box, ListItem } from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import useStyles from './FooterStyle';
import theme from './FooterTheme';
import { Link } from 'react-router-dom';

const Footer = () => {
  const styles = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={styles.footer} spacing={0}>
        <Grid container className={styles.footerContainer} justify='space-around'>
          <Grid item className={styles.gridItem} xs={12} sm={6} md={3}>
            <Box className={styles.box}>
              <Typography className={styles.title} variant='subtitle1' gutterBottom>Information</Typography>
              <ListItem><Link to='/products/filter?new=true' className={styles.item}>New products</Link></ListItem>
              <ListItem><Link to='/products/filter?isOnSale=true' className={styles.item}>Hot sale</Link></ListItem>
              <ListItem><Link to='/products/filter?special=true' className={styles.item}>Specials</Link></ListItem>
              <ListItem><Link to='/contacts' className={styles.item}>Our stores</Link></ListItem>
            </Box>
          </Grid>
          <Grid item className={styles.gridItem} xs={12} sm={6} md={3}>
            <Box className={styles.box}>
              <Typography className={styles.title} variant='subtitle1' gutterBottom>Customer service</Typography>
              <ListItem><Link to='/contacts' className={styles.item}>Help & contact</Link></ListItem>
              <ListItem><Link to='/shipping' className={styles.item}>Shipping & taxes</Link></ListItem>
              <ListItem><Link to='/returns' className={styles.item}>Return policy</Link></ListItem>
              <ListItem><Link to='/privacyPolicy' className={styles.item}>Privacy policy</Link></ListItem>
            </Box>
          </Grid>
          <Grid item className={styles.gridItem} xs={12} sm={6} md={3}>
            <Box className={styles.box}>
              <Typography className={styles.title} variant='subtitle1' gutterBottom>Contact info</Typography>
              <ListItem>Vigo Shop Ltd</ListItem>
              <ListItem>United Kingdom</ListItem>
              <ListItem>London 02587 </ListItem>
              <ListItem>Oxford Street 48/188</ListItem>
            </Box>
          </Grid>
          <Grid item className={styles.gridItem} xs={12} sm={6} md={3}>
            <Box className={styles.box}>
              <Typography className={styles.title} variant='subtitle1' gutterBottom>Our schedule</Typography>
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
