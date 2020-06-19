import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import themeMui from './MyAccTabsTheme';
import PersonalDetailsForm from '../PersonalDetailsForm/PersonalDetailsForm';
import AddressForm from '../AddressForm/AddressForm';
import Wishlist from '../../pages/Wishlist/Wishlist';
import {connect} from 'react-redux';
import {useMediaQuery} from '@material-ui/core';
import AjaxUtils from '../../ajax';
import {colors} from '../../styles/colorKit';

const TabPanel = (props) => {
  const { user, children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='span'>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
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
      bottom: 0,
      left: 0,
      '&$selected': {
        color: colors.noticeColor
      }
    }
  }
}));

const MyAccTabs = (props) => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AjaxUtils.Users.getUser()
      .then(result => {
        setUser(result);
        console.log(result);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const orientation = isMobile ? 'vertical' : 'horizontal';

  return (
    <Box className={classes.root}>
      <ThemeProvider theme={themeMui}>
        <AppBar elevation={0} position='static' color='default'>
          <Tabs
            className={classes.tab}
            value={value}
            onChange={handleChange}
            orientation={orientation}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='full width tabs'
          >
            <Tab className={classes.tab} component='span' label='Contact info' {...a11yProps(0)} />
            <Tab className={classes.tab} component='span' label='Address' {...a11yProps(1)} />
            <Tab className={classes.tab} component='span' label='Wishlist' {...a11yProps(2)} />
            <Tab className={classes.tab} component='span' label='Purchase history' {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          {
            user._id
              ? <PersonalDetailsForm submitPersonalDetailsHandler={() => {
                handleChange(null, value);
              }}/> : null}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <AddressForm submitAddressHandler={(submit) => {
            handleChange(null, value);
          }} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Wishlist />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {/* todo orders list. if order list is empty, show to user link to products */}
         your orders list
        </TabPanel>
      </ThemeProvider>
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

export default React.memo(connect(mapStateToProps)(MyAccTabs));