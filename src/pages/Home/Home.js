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

const renderData = {
  title: 'what\'s new',
  text: 'Showcasing what the world\'s most stylish people are buying right now',
  buttonText: 'Take look'
};

const urls = [
  {
    original: 'https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/top-slider/top_slider_1.jpg'
  },
  {
    original: 'https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/top-slider/top_slider_2.jpg'
  },
  {
    original: 'https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/top-slider/top_slider_3.jpg'
  }
];

const tabsNames = ['new arrivals', 'featured', 'special'];

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
          {token ? <CardNewsletter saveEmail={AjaxUtils.Subscribers.subscribe}/> : null}
        </Grid>
      </Grid>
      <ScrollToTop/>
    </Container>
  );
};

export default Home;