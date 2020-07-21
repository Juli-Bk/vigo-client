export default {
  liqpay_private_key: process.env.REACT_APP_LIQPAY_PRIVATE_KEY,
  liqpay_public_key: process.env.REACT_APP_LIQPAY_PUBLIC_KEY,

  liqpay_currency: 'USD',

  clientAddress: process.env.REACT_APP_ENVIRONMENT === 'development'
    ? 'http://localhost:3000'
    : process.env.REACT_APP_CLIENT_BASE_ADDRESS,

  serverAddress: process.env.REACT_APP_SERVER_BASE_ADDRESS,
  environment: process.env.REACT_APP_ENVIRONMENT
};