import React from 'react';
import TopSlider from '../../components/TopSlider/TopSlider';
import { Container, Grid } from '@material-ui/core';
import CardNewsletter from '../../components/CardNewsletter/CardNewsletter';
import Bestsellers from '../../containers/Bestsellers/Bestsellers';
import AboutUsBlock from '../../components/AboutVigoShop/AboutUsBlock/AboutUsBlock';
import TabsSliders from '../../components/TabsSliders/TabsSliders';
import BannerLineHomePage from '../../components/BannerLineHomePage/BannerLineHomePage';
import AjaxUtils from '../../ajax';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import { getJWTfromCookie } from '../../ajax/common/helper';

const Home = () => {
  const token = getJWTfromCookie();

  return (
    <Container>
      <TopSlider/>
      <BannerLineHomePage/>
      <TabsSliders/>
      <Grid container spacing={2} justify="center">
        <Grid item xl={8} lg={8} md={8} sm={8} xs={12}>
          <Bestsellers/>
          <AboutUsBlock title="About Vigo Shop"/>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
          {/* /!*{token ? <CardNewsletter saveEmail={AjaxUtils.Subscribers.subscribe}/> : null} */}
          <CardNewsletter saveEmail={AjaxUtils.Subscribers.subscribe}/>
        </Grid>
      </Grid>
      <ScrollToTop/>
    </Container>
  );
};

export default Home;