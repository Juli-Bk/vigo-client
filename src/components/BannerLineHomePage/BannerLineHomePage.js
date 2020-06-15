import React, {useState, useEffect} from 'react';
import { Grid, Box } from '@material-ui/core';
import Banner from './Banner/Banner';
import useStyles from './BannerLineHomePageStyle';
import { connect } from 'react-redux';

const BannerLineHomePage = props => {
  const {categories} = props;
  const [menLink, setMenLink] = useState('/products');
  const [girlsLink, setGirlsLink] = useState('');
  const styles = useStyles();

  useEffect(() => {
    if (categories) {
      categories.forEach(item => {
        if (item.name === 'women') {
          setGirlsLink(`/products/filter?categoryId=${item.id}`);
        } else if (item.name === 'men') {
          setMenLink(`/products/filter?categoryId=${item.id}&new=true`);
        }
      });
    }
  }, [categories]);

  return (
    <Grid data-testid='bannerContainer' className={styles.bannersCover} container spacing={4}>
      <Grid className={styles.fullSize} xs={12} sm={4} item>
        <Banner title='New men collection' alert={false} link={menLink} linkText='buy it now &gt;' imageLink='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/banners/newMenCollection.jpg'/>
      </Grid>
      <Grid className={styles.fullSize} xs={12} sm={4} item>
        <Banner title='Our new arrivals' alert={false} link='/products/filter?new=true' linkText='shop new in &gt;' imageLink='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/banners/newArrivals.jpg'/>
      </Grid>
      <Grid className={`${styles.fullSize} ${styles.bannerColumn}`} xs={12} sm={4} item>
        <Box className={styles.halfSize}>
          <Banner title='SALE' alert={true} subtitle='the half price summer ' link='/products/filter?isOnSale=true' imageLink='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/banners/sale.jpg'/>
        </Box>
        <Box className={styles.halfSize}>
          <Banner title='girls' alert={false} link={girlsLink} imageLink='https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/banners/girls.jpg'/>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = store => {
  return {
    categories: store.categories.categories
  };
};

export default React.memo(connect(mapStateToProps)(BannerLineHomePage));