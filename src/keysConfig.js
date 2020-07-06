import crypto from 'crypto';

const paymentOptions = {
  amount: '1',
  currency: 'UAH',
  order_id: '122343554668',
  action: 'pay',
  private_key: 'kg3uK1NOvYo6G7OPt1dieClKs2uIlxTHP0A9MgmS',
  public_key: 'i93893203564',
  description: 'product payment',
  version: 3
};

const data = btoa(JSON.stringify(paymentOptions));
const signString = paymentOptions.private_key + data + paymentOptions.private_key;
const sha1 = crypto.createHash('sha1');
sha1.update(signString);
const signature = sha1.digest('base64');

export const keysLiqpay = {
  data: data,
  signature: signature,
  embedTo: '#liqpay_checkout',
  mode: 'popup'
};

export const liqPay = {link: `https://www.liqpay.ua/api/3/checkout?data=${keysLiqpay.data}&signature=${keysLiqpay.signature}`};

export default keysLiqpay;