import React, {useState} from 'react';
import {ThemeProvider, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import themeMui from './MyAccTabsTheme';
import PersonalDetailsForm from '../PersonalDetailsForm/PersonalDetailsForm';
import AddressForm from '../AddressForm/AddressForm';
import Wishlist from '../../pages/Wishlist/Wishlist';
import {useMediaQuery} from '@material-ui/core';
import useStyles from '../../containers/Header/headerStyle';
import AddressRadioGroup from '../DefineDelivery/AddressRadioGroup';
import Grid from '@material-ui/core/Grid';
import OrdersList from './OrdersList/OrdersList';

const TabPanel = (props) => {
  const {user, children, value, adrList, index, ...other} = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{marginTop: '2rem'}}>
          {children}
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

const UserTabs = (props) => {
  const {user} = props;
  const isMobile = useMediaQuery('(max-width: 500px)');
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const orientation = isMobile ? 'vertical' : 'horizontal';

  return (
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
          <Tab className={classes.tab} component='span' label='Orders' {...a11yProps(3)} />
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <AddressRadioGroup addresses={user.addresses} isAccount={true}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddressForm submitAddressHandler={() => {
              handleChange(null, value);
            }}/>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2} dir={theme.direction}>
        <Wishlist/>
      </TabPanel>

      <TabPanel value={value} index={3} dir={theme.direction}>
        <OrdersList/>
      </TabPanel>
    </ThemeProvider>
  );
};

export default React.memo(UserTabs);