import React from 'react';
import Box from '@material-ui/core/Box';
import useStyles from './MyAccTabsStyle';
import UserTabs from './UserTabs';

const MyAccTabs = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <UserTabs/>
    </Box>
  );
};

export default React.memo(MyAccTabs);