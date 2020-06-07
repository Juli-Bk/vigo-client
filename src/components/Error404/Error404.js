import React from 'react';
import { Container, Grid, CardMedia, Typography } from '@material-ui/core';
import useStyles from './Error404Style';

const Error404 = () => {
  const styles = useStyles();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Box className={styles.sorryBlock}>
            <Typography className={}>

            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CardMedia
            className={styles.image}
            image='/img/404/dog_2.png'
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error404;
