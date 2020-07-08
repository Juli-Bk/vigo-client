import React from 'react';
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux';
import useStyles from './MyAccTabsStyle';
import UserTabs from './UserTabs';

const MyAccTabs = (props) => {
  const { user} = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <UserTabs user={user}/>
    </Box>
  );
};

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

export default React.memo(connect(mapStateToProps)(MyAccTabs));