import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Banner from './Banner/Banner';
import useStyles from './BannerLineHomePageStyle';

// todo working links

const BannerLineHomePage = props => {
  const styles = useStyles();

  return (
    <Grid data-testid='bannerContainer' className={styles.bannersCover} container spacing={4}>
      <Grid className={styles.fullSize} xs={12} sm={4} item>
        <Banner title='New men collection' alert={false} link='/products/' linkText='buy it now &gt;' imageLink='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/banners/newMenCollection.jpg'/>
      </Grid>
      <Grid className={styles.fullSize} xs={12} sm={4} item>
        <Banner title='Our new arrivals' alert={false} link='/products/' linkText='shop new in &gt;'imageLink='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/banners/newArrivals.jpg'/>
      </Grid>
      <Grid className={`${styles.fullSize} ${styles.bannerColumn}`} xs={12} sm={4} item>
        <Box className={styles.halfSize}>
          <Banner title='SALE' alert={true} subtitle='the half price summer ' link='/products/' imageLink='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/banners/sale.jpg'/>
        </Box>
        <Box className={styles.halfSize}>
          <Banner title='girls' alert={false} link='/products/' imageLink='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/banners/girls.jpg'/>
        </Box>
      </Grid>
    </Grid>
  );
};

export default React.memo(BannerLineHomePage);