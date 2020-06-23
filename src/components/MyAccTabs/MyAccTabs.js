import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux';
import useStyles from './MyAccTabsStyle';
import {getUserData} from '../../redux/actions/user';
import UserTabs from './UserTabs';

const MyAccTabs = (props) => {
  const { user, getUserData } = props;
  const classes = useStyles();

  useEffect(getUserData, []);

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

const mapDispatchToProps = dispatch => {
  return {
    getUserData: isOpen => dispatch(getUserData(isOpen))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(MyAccTabs));