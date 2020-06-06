import React from 'react';
import useStyles from './ContactsMapStyle.js';
import { CardMedia, Grid } from '@material-ui/core';

const ContactsMap = () => {
  const styles = useStyles();

  return (
    <Grid item xs={12}>
      <CardMedia
        data-testid='mapContainer'
        title='map' className={styles.map}
        component='iframe'
        src='https://www.google.com/maps/embed/v1/place?q=place_id:ChIJq4_BAQDJ1EARPfufc3rK_VI&key=AIzaSyDYssG7yXgX5iZEwiG4H7hPGdydSyliRiI'
      />
    </Grid>
  );
};

export default ContactsMap;
