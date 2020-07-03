import { getStorageData } from './helpers/helpers';
import globalConfig from './globalConfig';

const paymentOptions = {
  amount: getStorageData('totalSum'),
  currency: globalConfig.defaultCurrency,
  order_id: getStorageData('order')._id,
  action: 'pay',
  private_key: 'kg3uK1NOvYo6G7OPt1dieClKs2uIlxTHP0A9MgmS',
  public_key: 'i93893203564',
  description: 'product payment',
  version: 3
};

const json = JSON.stringify(paymentOptions);
console.log(json);
// todo pass data to keysLiqpay.data

const data = btoa(json);
// eslint-disable-next-line no-unused-vars
const signature = paymentOptions.private_key + data + paymentOptions.private_key;
// todo hash signature with SHA1
console.log(signature);

export const keysLiqpay = {
  data: 'eyJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOiIxIiwiY3VycmVuY3kiOiJVU0QiLCJkZXNjcmlwdGlvbiI6ImRlc2NyaXB0aW9uIHRleHQiLCJvcmRlcl9pZCI6Im9yZGVyX2lkXzEiLCJ2ZXJzaW9uIjoiMyJ9',
  signature: '676htJyQmMkox9gAKkyYoI8ige8=',
  embedTo: '#liqpay_checkout',
  mode: 'embed'
};

export const liqPay = {
  link: 'https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXkiLCJwdWJsaWNfa2V5IjoiaTkzODkzMjAzNTY0IiwiYW1vdW50IjoiNSIsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiLQnNC%2B0Lkg0YLQvtCy0LDRgCIsInR5cGUiOiJidXkiLCJsYW5ndWFnZSI6ImVuIn0%3D&signature=qfXnJw%2BIj4LWZZdkhKf8CF7uJkw%3D'
};

export default keysLiqpay;