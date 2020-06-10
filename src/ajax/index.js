import products from './products/requests';
import users from './users/requests';
import categories from './categories/requests';
import subscribers from './subscribers/requests';
import wishLists from './wishLists/requests';
import colors from './colors/requests';
import size from './size/requests';
import sizeTables from './sizeTables/requests';
import quantity from './quantity/requests';

const AjaxUtils = {
  Products: products,
  Users: users,
  Categories: categories,
  Subscribers: subscribers,
  WishLists: wishLists,
  Colors: colors,
  Sizes: size,
  SizeTables: sizeTables,
  Quantity: quantity
};

export default AjaxUtils;