import React from 'react';
import VigoPrivacyPolicy from '../../components/VigoPrivacyPolicy/VigoProvacyPolicy';
import { Container } from '@material-ui/core';

const PrivacyPolicy = () => {
  return (
    <Container style={{marginBottom: '2rem'}}>
      <VigoPrivacyPolicy />
    </Container>
  );
};

export default PrivacyPolicy;