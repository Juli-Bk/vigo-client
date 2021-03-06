const globalConfig = {
  baseImgUrl: 'https://vigo-shop-aws-bucket.s3.eu-central-1.amazonaws.com',
  phoneNumberRegExp: /^\+?3?8?(0\d{9})$/,
  postalCode: /\b\d{5}\b/g,
  priceIsInteger: true,
  contacts: {
    landline: ['0203 980 1479', '0203 478 1296'],
    cellphone: ['044-115-747-38', '044-170-029-32'],
    email: ['vigo.shop.official@gmail.com'],
    skype: ['Vigo_shop_contact']
  },
  deliveryOptions: {
    VIGO_COURIER_SERVICE: 'Vigo Courier Service',
    NOVA_POSHTA: 'Nova Poshta',
    UKRPOSHTA: 'Post Office Ukrposhta',
    PICKUP: 'Pick up from store'
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
  iconsLabels: {
    ADD_TO_WISHLIST: 'ADD TO WISHLIST',
    ADD_TO_COMPARE: 'ADD TO COMPARE'
  },
  sortOptions: {
    New_In: 'New In',
    Price_Low_To_High: 'Price Low To High',
    Price_High_To_Low: 'Price High To Low'
  },
  SortOptionToQuery: {
    'New In': '-date',
    'Price Low To High': 'salePrice',
    'Price High To Low': '-salePrice'
  },
  QueryToSortOption: {
    '-date': 'New In',
    salePrice: 'Price Low To High',
    '-salePrice': 'Price High To Low'
  },
  step: 15,
  defaultQuantity: 1,
  wishListMessages: {
    UPDATED: 'Your wishlist is updated',
    EMPTY: 'Your Wishlist is Empty'
  },
  cartMessages: {
    CREATED: 'Shopping cart created for you',
    UPDATED: 'Your shopping cart updated successfully',
    ERROR: 'Shopping cart error happened. Try again, please',
    IN_CART: 'This item is in your cart already',
    EMPTY: 'Your Shopping Cart is Empty'
  },
  compareMessages: {
    EMPTY: 'You don`t have any items in Compare List'
  },
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
    buttonText: 'Take a look'
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
  tabsSliderNames: {
    newArrivals: 'new arrivals',
    featured: 'featured',
    special: 'special'
  },
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
  snackSeverity: {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
  },
  defaultShipping: 0,
  defaultTax: 0,
  defaultCurrency: 'USD',
  wishlistLength: 15,
  errors: {
    500: 'Unknown error. But we are trying to fix it right now!',
    404: 'This page cannot be found.',
    network: 'Please, check your internet connection'
  }
};

export default globalConfig;