import React, {useEffect} from 'react';
import { Container, Grid, CardMedia, Typography, Box } from '@material-ui/core';
import useStyles from './Error404Style';

const Error404 = () => {
  const styles = useStyles();

  useEffect(() => {
    if (document.readyState === 'complete') {
      document.getElementById('free-solo-dialog-demo').focus();
    }
  }, []);
  return (
    <Container>
      <Grid container className={styles.box}>
        <Grid item xs={11} sm={6}>
          <Box className={styles.sorryBlock}>
            <Typography className={styles.sorryTitle} variant='h1'>
              We’re Sorry...
            </Typography>
            <Typography className={styles.secondLine} variant='body1'>This page cannot be found.</Typography>
            <Typography className={styles.thirdLine} variant='body2'>Maybe you want to perform a search?</Typography>
          </Box>
        </Grid>
        <Grid item xs={11} sm={5}>
          <CardMedia
            className={styles.image}
            image='/img/404/dog_2.png'
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(Error404);
