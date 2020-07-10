import React from 'react';
import TopSlider from '../../components/TopSlider/TopSlider';
import { Container, Grid } from '@material-ui/core';
import CardNewsletter from '../../components/CardNewsletter/CardNewsletter';
import Bestsellers from '../../containers/Bestsellers/Bestsellers';
import AboutUsBlock from '../../components/AboutVigoShop/AboutUsBlock/AboutUsBlock';
import TabsSliders from '../../components/TabsSliders/TabsSliders';
import BannerLineHomePage from '../../components/BannerLineHomePage/BannerLineHomePage';
import AjaxUtils from '../../ajax';
import { getJWTfromCookie } from '../../ajax/common/helper';

const Home = () => {
  const token = getJWTfromCookie();

  return (
    <Container>
      <TopSlider/>
      <BannerLineHomePage/>
      <TabsSliders/>
      <Grid container spacing={2} justify="center">
        <Grid item sm={8} xs={12}>
          <Bestsellers/>
          <AboutUsBlock title="About Vigo Shop"/>
        </Grid>
        <Grid item sm={4} xs={12}>
          {token ? <CardNewsletter saveEmail={AjaxUtils.Subscribers.subscribe}/> : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;