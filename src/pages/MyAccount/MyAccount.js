import React from 'react';
import MyAccTabs from '../../components/MyAccTabs/MyAccTabs';
import { Container } from '@material-ui/core';

const MyAccount = () => {
  return (
    <Container component='span'>
      <MyAccTabs/>
    </Container>
  );
};

export default React.memo(MyAccount);