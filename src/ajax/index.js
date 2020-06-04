import products from './products/requests';
import users from './users/requests';
import categories from './categories/requests';
import subscribers from './subscribers/requests';
import wishLists from './wishLists/requests';

const AjaxUtils = {
  Products: products,
  Users: users,
  Categories: categories,
  Subscribers: subscribers,
  WishLists: wishLists
};

export default AjaxUtils;