import React from 'react';
import { Container, Grid } from '@material-ui/core';
import ContactsMap from '../../components/ContactsMap/ContactsMap';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactDetails from '../../components/ContactDetails/ContactDetails';
import SizeTable from '../../components/SizeTable/SizeTable';

const Contacts = () => {
  // todo сделать запросы для формы обратной связи, написать тесты для запросов.
  // Когда страница полностью будет готова - раскоментировать карту
  return (
    <Container>
      <Grid container spacing={2}>
        {/* <ContactsMap /> */}
        {/* <ContactForm submitHandler={AjaxUtils.ContactUs.sendFeedback}/> */}
        {/* <ContactForm /> */}
        {/* <ContactDetails /> */}
      </Grid>
      <SizeTable id="5ee4ebcb87ae95ab81b85ff7"/>
    </Container>
  );
};

export default Contacts;