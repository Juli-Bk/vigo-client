import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@material-ui/core';
import Banner from './Banner/Banner';
import useStyles from './BannerLineHomePageStyle';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../globalConfig';
import {setCategoryId} from '../../redux/actions/categories';
import {addFilters} from '../../redux/actions/products';

const BannerLineHomePage = props => {
  const {categories, setCategoryId, addFilters} = props;
  const [menLink, setMenLink] = useState('/products');
  const [girlsLink, setGirlsLink] = useState('');
  const styles = useStyles();

  useEffect(() => {
    if (categories) {
      categories.forEach(item => {
        if (item.name === 'women') {
          setCategoryId(item.id);
          setGirlsLink(`/products/filter?categoryId=${item.id}`);
        } else if (item.name === 'men') {
          const filters = {
            categoryId: item.id,
            new: true
          };
          addFilters(filters);
          setMenLink(`/products/filter?categoryId=${item.id}&new=true`);
        }
      });
    }
  }, [addFilters, categories, setCategoryId]);

  return (
    <Grid data-testid='bannerContainer' className={styles.bannersCover} container spacing={4}>
      <Grid className={styles.fullSize} xs={12} sm={4} item>
        <Banner title='New men collection' alert={false}
          link={menLink} linkText='buy it now &gt;'
          imageLink={config.baseImgUrl + '/img/banners/newMenCollection.jpg'}/>
      </Grid>
      <Grid className={styles.fullSize} xs={12} sm={4} item>
        <Banner title='Our new arrivals' alert={false}
          link={'/products/filter?new=true'}
          linkText='shop new in &gt;'
          imageLink={config.baseImgUrl + '/img/banners/newArrivals.jpg'}/>
      </Grid>
      <Grid className={`${styles.fullSize} ${styles.bannerColumn}`} xs={12} sm={4} item>
        <Box className={styles.halfSize}>
          <Banner title='SALE' alert={true}
            subtitle='the half price summer'
            link='/products/filter?isOnSale=true'
            imageLink={config.baseImgUrl + '/img/banners/sale.jpg'}/>
        </Box>
        <Box className={styles.halfSize}>
          <Banner title='girls' alert={false} link={girlsLink}
            imageLink={config.baseImgUrl + '/img/banners/girls.jpg'}/>
        </Box>
      </Grid>
    </Grid>
  );
};

BannerLineHomePage.propTypes = {
  categories: PropTypes.array
};

const mapStateToProps = store => {
  return {
    categories: store.categories.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCategoryId: id => dispatch(setCategoryId(id)),
    addFilters: filters => dispatch(addFilters(filters))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(BannerLineHomePage));