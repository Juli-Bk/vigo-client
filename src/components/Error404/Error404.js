import React from 'react';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import useStyles from './Error404Style';
import globalConfig from '../../globalConfig';

const Error404 = (props) => {
  const {errorType, searchText} = props;
  const styles = useStyles();

  return (
    <Container>
      <Grid container alignItems='center' className={styles.box}>
        <Grid item xs={11} sm={6} className={styles.dialog}>
          <Box className={styles.sorryBlock}>
            <Typography data-testid='title' className={styles.sorryTitle} variant='h1'>
              We’re Sorry...
            </Typography>
            <Typography data-testid='secondLine' className={styles.secondLine} variant='body1'>{globalConfig.errors[errorType]}</Typography>
            {searchText && <Typography data-testid='thirdLine' className={styles.thirdLine} variant='body2'>Maybe you want to perform a search?</Typography>}
          </Box>
        </Grid>
        <Grid item xs={11} sm={5}>
          <img data-testid='img'
            className={styles.image}
            src='/img/404/dog_2.png'
            alt='sorry dog'
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(Error404);
