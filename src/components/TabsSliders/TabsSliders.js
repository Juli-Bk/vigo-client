import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Box, makeStyles, Tab, Tabs, ThemeProvider, withWidth} from '@material-ui/core';
import TabPanel from './TabPanel';
import TabSlider from './TabSlider';
import theme from './TabsSlidersTheme';
import {colors} from '../../styles/colorKit';
import globalConfig from '../../globalConfig';
import { getFeatured, getNewArrivals, getSpecial } from '../../redux/actions/products';

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  tab: {
    position: 'relative',
    '&::before': {
      position: 'absolute',
      content: '""',
      height: 1,
      width: '300%',
      background: colors.thinLine,
      top: 0,
      left: 0
    }
  }
}));

const TabsSliders = (props) => {
  const classes = useStyles();
  const {width, featured, special, newArrivals, getFeatured, getSpecial, getNewArrivals} = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      getFeatured();
      getSpecial();
      getNewArrivals();
    }
    return () => {
      isCanceled = true;
    };
  }, [getFeatured, getNewArrivals, getSpecial]);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const orientation = useMemo(() => width === 'xs' ? 'vertical' : 'horizontal', [width]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Box>
          <Tabs value={value}
            orientation={orientation}
            onChange={handleChange}
            aria-label="tabs-for-sliders">
            {globalConfig.tabsSliderNames.map((name, index) => {
              return (<Tab label={name} {...a11yProps(index)} key={index} disableRipple={true} className={classes.tab}/>);
            })}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} key={0} width={width}>
          <TabSlider data={newArrivals} width={width}/>
        </TabPanel>
        <TabPanel value={value} index={1} key={1} width={width}>
          <TabSlider data={featured} width={width}/>
        </TabPanel>
        <TabPanel value={value} index={2} key={2} width={width}>
          <TabSlider data={special} width={width}/>
        </TabPanel>
      </div>
    </ThemeProvider>
  );
};

TabsSliders.propTypes = {
  width: PropTypes.string.isRequired,
  featured: PropTypes.array.isRequired,
  special: PropTypes.array.isRequired,
  newArrivals: PropTypes.array.isRequired,
  getFeatured: PropTypes.func.isRequired,
  getSpecial: PropTypes.func.isRequired,
  getNewArrivals: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    featured: store.products.featured,
    special: store.products.special,
    newArrivals: store.products.newArrivals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFeatured: () => dispatch(getFeatured()),
    getSpecial: () => dispatch(getSpecial()),
    getNewArrivals: () => dispatch(getNewArrivals())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withWidth()(TabsSliders)));