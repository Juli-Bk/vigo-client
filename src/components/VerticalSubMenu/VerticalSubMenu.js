import useStyles from '../NestedMenu/NestedMenuStyle';
import React, {useCallback, useMemo, useState} from 'react';
import MenuPanel, {getMenuLink} from '../MenuPanel/MenuPanel';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import config from '../../globalConfig';
import Banner from '../BannerLineHomePage/Banner/Banner';
import {Grid} from '@material-ui/core';
import useBannerStyles from '../BannerLineHomePage/BannerLineHomePageStyle';

const VerticalSubMenu = (props) => {
  const {categories} = props;
  const classes = useStyles();
  const styles = useBannerStyles();
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const links = useMemo(() => categories.map((root, index) => {
    return getMenuLink(root, index);
  }), [categories]);

  const subLinks = useMemo(() => categories.map((root, index) => {
    return <MenuPanel
      value={value}
      key={root.id}
      index={index}
      items={root.children}/>;
  }), [categories, value]);

  const banners = <>
    <Grid className={styles.bannersCover} container spacing={2}>
      <Grid className={styles.fullSize} xs={12} sm={6} item>
        <Banner title='Show me all'
          alert={false}
          link={'/products'}
          linkText='shop now'
          classLabelName='blackColor'
          imageLink={config.baseImgUrl + '/img/banners/menu-gif-1.gif'}/>
      </Grid>

      <Grid className={styles.fullSize} xs={12} sm={6} item>
        <Banner title='Hello from Italy'
          alert={false}
          link={'/products/filter?manufacturerCountry=italy'}
          linkText='made in Italy'
          classLabelName='blackColor'
          imageLink={config.baseImgUrl + '/img/banners/menu-gif-2.gif'}/>
      </Grid>
    </Grid>
  </>;

  return (
    <Box className={classes.vert}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {links}
      </Tabs>
      {subLinks}
      {banners}
    </Box>
  );
};

VerticalSubMenu.propTypes = {
  categories: PropTypes.array.isRequired
};

export default React.memo(VerticalSubMenu);