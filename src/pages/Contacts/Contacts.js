import React from 'react';
import { Container, Grid } from '@material-ui/core';
import ContactsMap from '../../components/ContactsMap/ContactsMap';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactDetails from '../../components/ContactDetails/ContactDetails';

const Contacts = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <ContactsMap />
        <ContactForm />
        <ContactDetails />
      </Grid>
    </Container>
  );
};

export default Contacts;