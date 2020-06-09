export const baseUrl = 'https://vigo-server.herokuapp.com';

const RequestsConfig = {
  categories: `${baseUrl}/categories`,
  products: `${baseUrl}/products`,
  productsFilter: `${baseUrl}/products/filter?`,
  productsSearch: `${baseUrl}/products/search`,
  users: `${baseUrl}/users`,
  login: `${baseUrl}/users/login`,
  customer: `${baseUrl}/users/customer`,
  register: `${baseUrl}/users/register`,
  password: `${baseUrl}/users/password`,
  unsubscribe: `${baseUrl}/subscribers/unsubscribe`,
  subscribers: `${baseUrl}/subscribers`,
  subscribe: `${baseUrl}/subscribers/subscribe`,
  wishlist: `${baseUrl}/wishlist`,
  colors: `${baseUrl}/colors`,
  sizes: `${baseUrl}/sizes`,
  sizeTables: `${baseUrl}/sizeTables`

};

export default RequestsConfig;