import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Box, makeStyles, Tab, Tabs, ThemeProvider, withWidth } from '@material-ui/core';
import TabPanel from './TabPanel';
import TabSlider from './TabSlider';
import theme from './TabsSlidersTheme';
import { colors } from '../../styles/colorKit';
import AjaxUtils from '../../ajax';

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
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
  const {width, tabsNames} = props;

  const [newArrivals, setNewArrivals] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [special, setSpecial] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let isCanceled = false;
    const twoWeeksAgo = moment().subtract(14, 'days').format('YYYY.MM.DD');
    const currentDate = moment().format('YYYY.MM.DD');

    if (!isCanceled) {
      AjaxUtils.Products.getProductsByFilters([{minCreatedDate: twoWeeksAgo}, {maxCreatedDate: currentDate}], 1, 15, '')
        .then(result => {
          setNewArrivals(result.products);
        });
      AjaxUtils.Products.getProductsByFilters([{featured: true}], 1, 15, '')
        .then(result => {
          setFeatured(result.products);
        });
      AjaxUtils.Products.getProductsByFilters([{special: true}], 1, 15, '')
        .then(result => {
          setSpecial(result.products);
        });
    }
    return () => {
      isCanceled = true;
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const orientation = width === 'xs' ? 'vertical' : 'horizontal';

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Box>
          <Tabs value={value}
            orientation={orientation}
            onChange={handleChange}
            aria-label="tabs-for-sliders">
            {tabsNames.map((name, index) => {
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
  width: PropTypes.string.isRequired
};

export default React.memo(withWidth()(TabsSliders));