import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Banner from './Banner';

const testData = {
  imageLink: 'https://bipbap.ru/wp-content/uploads/2017/08/16.jpg',
  title: 'SALE',
  subtitle: 'price summer',
  alert: false,
  link: '#',
  linkText: 'shop new in'
};

describe('banner testing', () => {
  it('banner renders title properly', () => {
    const card = render(
      <BrowserRouter>
        <Banner imageLink={testData.imageLink}
          title={testData.title}
          alert={testData.alert}
          link={testData.link}
          linkText={testData.linkText} />
      </BrowserRouter>);
    const title = card.getByText(testData.title);
    expect(title).toBeInTheDocument();
  });
  it('banner renders subtitle properly', () => {
    const card = render(
      <BrowserRouter>
        <Banner subtitle={testData.subtitle}
          imageLink={testData.imageLink}
          title={testData.title}
          alert={testData.alert}
          link={testData.link}
          linkText={testData.linkText} />
      </BrowserRouter>);
    const subtitle = card.getByText(testData.subtitle);
    expect(subtitle).toBeInTheDocument();
  });
});