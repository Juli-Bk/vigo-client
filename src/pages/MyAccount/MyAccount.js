import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './MyAccountStyle';
import MyAccTabs from '../../components/MyAccTabs/MyAccTabs';
import { Container, Paper } from '@material-ui/core';

const MyAccount = () => {
  const styles = useStyles();
  return (
    <Container>
      <Paper elevation={0}>
        <Typography variant="h5" className={styles.header} gutterBottom>
           My Account
        </Typography>
        <MyAccTabs/>
      </Paper>
    </Container>
  );
};

export default React.memo(MyAccount);