import React from 'react';
import {Box, Grid, Typography} from '@material-ui/core';
import useStyles from './AboutUsBlockStyle';
import TextWithTitleAndLink from '../TextWithTitleAndLink/TextWithTitleAndLink';
import PropTypes from 'prop-types';
import AboutUsSlider from '../AboutUsSlider/AboutUsSlider';

function AboutUsBlock (props) {
  const {title} = props;
  const text = 'Since its launch in June 2020, Vigo Shop has delivered incredible ' +
    'fashion for incredible women. With more than 800 of the world’s most coveted designer brands,' +
    ' including Gucci, Chloe, Balenciaga, Saint Laurent, Isabel Marant, Prada, and Stella McCartney,' +
    ' 200 specialist beauty brands, and new arrivals on site three times a week,' +
    ' VIGO-shop is the world\'s premier luxury fashion destination.';
  const styles = useStyles();

  return (
    <Grid className={styles.aboutUsBlock} container item xs={12}>
      <Box className={styles.div}>
        <Box className={styles.innerDiv}>
          <Typography className={styles.title} variant='h2'>{title}</Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid className={styles.gridItem} item xs={12} lg={5} md={6}>
          <TextWithTitleAndLink title='our history' text={text} />
        </Grid>
        <Grid className={styles.gridItem} item xs={12} lg={7} md={6}>
          <AboutUsSlider/>
        </Grid>
      </Grid>
    </Grid>
  );
}

AboutUsBlock.propTypes = {
  title: PropTypes.string.isRequired
};

export default React.memo(AboutUsBlock);
