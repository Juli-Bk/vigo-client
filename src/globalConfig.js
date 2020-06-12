const globalConfig = {
  priceIsInteger: true,
  contacts: {
    landline: ['0203 980 1479', '0203 478 1296'],
    cellphone: ['445-115-747-38', '445-170-029-32'],
    email: ['Vigo_shop@gmail.com', 'Vigo@hotmail.com'],
    skype: ['Vigo_shop_contact', 'Vigo_support']
  },
  deliveryOptions: {
    VIGO_COURIER_SERVICE: 'Vigo Courier Service',
    NOVA_POSHTA: 'Nova Poshta',
    DHL_EXPRESS: 'DHL Express',
    FEDEX: 'FedEx',
    PICKUP: 'Pickup',
    POST_OFFICE: 'Post Office'
  },
  maxRecentlyViewed: 8,
  emptyWishList: 'You don`t have any items in your wishlist',
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
  userMessages: {
    NOT_AUTHORIZED: 'You are not authorized. Login, please'
  },
  minDefaultPrice: 0,
  maxDefaultPrice: 3000
};

export default globalConfig;