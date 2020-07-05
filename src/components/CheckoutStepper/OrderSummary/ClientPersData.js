import React from 'react';
import {Box, Typography} from '@material-ui/core';

const ClientPersData = (props) => {
  const { client, classes } = props;
  return (
    <Box>
      <Typography className={classes.text}>{client.firstName} {client.lastName}</Typography>
      <Typography className={classes.text}>Phone: {client.phoneNumber}</Typography>
      <Typography className={classes.text}>Email: {client.email}</Typography>
    </Box>
  );
};

export default React.memo(ClientPersData);