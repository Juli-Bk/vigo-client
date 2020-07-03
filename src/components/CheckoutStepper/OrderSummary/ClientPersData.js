import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

const ClientPersData = (props) => {
  const { client, classes } = props;
  return (
    <List>
      <ListItem className={classes.text}>{client.firstName} {client.lastName}</ListItem>
      <ListItem className={classes.text}>Phone: {client.phoneNumber}</ListItem>
      <ListItem className={classes.text}>Email: {client.email}</ListItem>
    </List>
  );
};

export default React.memo(ClientPersData);