import products from './products/requests';
import users from './users/requests';
import categories from './categories/requests';
import subscribers from './subscribers/requests';
import wishLists from './wishLists/requests';
import colors from './colors/requests';
import size from './size/requests';
import sizeTables from './sizeTables/requests';
import quantity from './quantity/requests';
import shopCart from './shopCart/requests';
import orders from './orders/requests';
import email from './email/requests';

const AjaxUtils = {
  Products: products,
  Users: users,
  Categories: categories,
  Subscribers: subscribers,
  WishLists: wishLists,
  Colors: colors,
  Sizes: size,
  SizeTables: sizeTables,
  Quantity: quantity,
  ShopCart: shopCart,
  Orders: orders,
  Email: email
};

export default AjaxUtils;