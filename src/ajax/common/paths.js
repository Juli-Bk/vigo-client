export const baseUrl = 'https://vigo-server.herokuapp.com';
// export const baseUrl = 'http://localhost:9229';

const RequestsConfig = {
  categories: `${baseUrl}/categories`,
  products: `${baseUrl}/products`,
  productsFilter: `${baseUrl}/products/filter?`,
  productsSearch: `${baseUrl}/products/search`,
  maxPrice: `${baseUrl}/products/max`,

  users: `${baseUrl}/users`,
  login: `${baseUrl}/users/login`,
  loginRefresh: `${baseUrl}/users/login/refresh`,
  customer: `${baseUrl}/users/customer`,
  register: `${baseUrl}/users/register`,
  password: `${baseUrl}/users/password`,
  logout: `${baseUrl}/users/logout`,
  emailConfirmation: `${baseUrl}/users/email-confirmation`,
  restorePassword: `${baseUrl}/users/recovery`,
  restore: `${baseUrl}/users/password-recovery`,

  unsubscribe: `${baseUrl}/subscribers/unsubscribe`,
  subscribers: `${baseUrl}/subscribers`,
  subscribe: `${baseUrl}/subscribers/subscribe`,
  wishlist: `${baseUrl}/wishlist`,
  colors: `${baseUrl}/colors`,
  sizes: `${baseUrl}/sizes`,
  sizeTables: `${baseUrl}/sizeTables`,
  quantity: `${baseUrl}/quantity`,
  cart: `${baseUrl}/cart`,
  orders: `${baseUrl}/orders`,
  cancelOrder: `${baseUrl}/orders/cancel`,
  sendEmail: `${baseUrl}/mail`
};

export default RequestsConfig;