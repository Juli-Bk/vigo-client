import React from 'react';
import { Container } from '@material-ui/core';
import ShippingAndTaxes from '../../components/ShippingAndTaxes/ShippingAndTaxes';

const Shipping = () => {
  return (
    <Container style={{marginBottom: '2rem'}}>
      <ShippingAndTaxes />
    </Container>
  );
};

export default Shipping;
