import React from 'react';
import { Container, Grid } from '@material-ui/core';
// import ContactsMap from '../../components/ContactsMap/ContactsMap';
import ContactForm from '../../components/ContactForm/ContactForm';

const Contacts = () => {
  return (
    <Container>
      <Grid container>
        {/* <ContactsMap /> */}
        {/* <ContactForm submitHandler={AjaxUtils.ContactUs.sendFeedback}/> */}
        <ContactForm />
      </Grid>
    </Container>
  );
};

export default Contacts;