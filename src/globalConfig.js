const globalConfig = {
  baseImgUrl: 'https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com',
  phoneNumberRegExp: /^\+?3?8?(0\d{9})$/,
  postalCode: /\b\d{5}\b/g,
  priceIsInteger: true,
  contacts: {
    landline: ['0203 980 1479', '0203 478 1296'],
    cellphone: ['044-115-747-38', '044-170-029-32'],
    // todo завести такую почту
    email: ['Vigo_shop@gmail.com', 'Vigo@hotmail.com'],
    // todo завести такой скайп
    skype: ['Vigo_shop_contact', 'Vigo_support']
  },
  deliveryOptions: {
    VIGO_COURIER_SERVICE: 'Vigo Courier Service',
    NOVA_POSHTA: 'Nova Poshta',
    UKRPOSHTA: 'Post Office Ukrposhta',
    PICKUP: 'Pickup'
  },
  paymentOptions: {
    BY_CASH: 'Cash',
    LIQ_PAY: 'LiqPay'
  },
  regions: {
    KYIV: 'Kyiv, Kyiv region',
    DNIPRO: 'Dnipro, Dnipro region',
    KHARKIV: 'Kharkiv, Kharkiv region',
    CHERKASY: 'Cherkasy, Cherkasy region',
    CHERNIHIV: 'Chernihiv, Chernihiv region',
    CHERNIVTSI: 'Chernivtsi, Chernivtsi region',
    DONETSK: 'Donetsk, Donetsk region',
    IVANO_FRANKIVSK: 'Ivano-Frankivsk, Ivano-Frankivsk region',
    KHERSON: 'Kherson, Kherson region',
    KHMELNYTSKYI: 'Khmelnytskyi, Khmelnytskyi region',
    KROPYVNYTSKYI: 'Kropyvnytskyi, Kirovohrad region',
    LUHANSK: 'Luhansk, Luhansk region',
    LVIV: 'Lviv, Lviv region',
    MYKOLAIV: 'Mykolaiv, Mykolaiv region',
    ODESSA: 'Odessa, Odessa region',
    POLTAVA: 'Poltava, Poltava region',
    RIVNE: 'Rivne, Rivne region',
    SUMY: 'Sumy, Sumy region',
    VINNYTSIA: 'Vinnytsia, Vinnytsia region',
    LUTSK: 'Lutsk, Volyn region',
    UZHHOROD: 'Uzhhorod, Zakarpattia region',
    ZAPORIZHIA: 'Zaporizhia, Zaporizhia region',
    ZYTOMYR: 'Zhytomyr, Zhytomyr region'
  },
  maxRecentlyViewed: 8,
  emptyWishList: 'You don`t have any items in your Wishlist',
  emptyCart: 'You don`t have any items in your Shopping Cart',
  iconsLabels: {
    ADD_TO_WISHLIST: 'ADD TO WISHLIST',
    ADD_TO_COMPARE: 'ADD TO COMPARE'
  },
  sortOptions: {
    New_In: 'New In',
    Price_Low_To_High: 'Price Low To High',
    Price_High_To_Low: 'Price High To Low'
  },
  step: 15,
  defaultQuantity: 1,
  userMessages: {
    NOT_AUTHORIZED: 'You are not authorized. Login, please',
    EMPTY_RESULT: 'Any results matching your search',
    SUBSCRIBED: 'You are successfully subscribed to our news letters!'
  },
  minDefaultPrice: 0,
  maxDefaultPrice: 3000,
  topSliderData: {
    title: 'what\'s new',
    text: 'Showcasing what the world\'s most stylish people are buying right now',
    buttonText: 'Take look'
  },
  topSliderImages: [
    {
      original: 'https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/top-slider/top_slider_1.jpg'
    },
    {
      original: 'https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/top-slider/top_slider_2.jpg'
    },
    {
      original: 'https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com/img/top-slider/top_slider_3.jpg'
    }
  ],
  tabsSliderNames: ['new arrivals', 'featured', 'special'],
  viewOptions: {
    module: 'module',
    list: 'list'
  },
  sizeRenderOptions: {
    ALL: 'all',
    ACCESSORIES: 'accessories'
  },
  defaultSizeOption: 'Select size',
  defaultQuantityOption: 1,
  defaultShipping: 0,
  defaultTax: 0
};

export default globalConfig;