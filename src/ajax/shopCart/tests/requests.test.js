import shopCartRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, {path: ''});
});

afterEach(() => {
  Cookie.remove('token');
});

describe('shopCartRequests has methods for all operations', () => {
  it('getAllUShopCarts', () => {
    expect(shopCartRequests).toHaveProperty('getAllUShopCarts');
  });
  it('getUserShopCart', () => {
    expect(shopCartRequests).toHaveProperty('getUserShopCart');
  });
  it('createShopCart', () => {
    expect(shopCartRequests).toHaveProperty('createShopCart');
  });
  it('updateShopCartById', () => {
    expect(shopCartRequests).toHaveProperty('updateShopCartById');
  });
  it('deleteShopCartById', () => {
    expect(shopCartRequests).toHaveProperty('deleteShopCartById');
  });
  it('deleteAllShopCarts', () => {
    expect(shopCartRequests).toHaveProperty('deleteAllShopCarts');
  });
});

describe('all shopCartRequests methods return Promise', () => {
  it('getAllUShopCarts', () => {
    const rez = shopCartRequests.getAllUShopCarts();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getUserShopCart', () => {
    const rez = shopCartRequests.getUserShopCart('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('createShopCart', () => {
    const rez = shopCartRequests.createShopCart('5eb302600b88a114a9daec58', [{
      productId: '5edf5173cb33a1322b83c1e1',
      cartQuantity: 1,
      sizeId: '5edf4f5de55cc632053b8298',
      colorId: '5edf4ea4fb3a6231dd8f3b78'
    }]);
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updateShopCartById', () => {
    const rez = shopCartRequests.updateShopCartById('5eb302600b88a114a9daec58', []);
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteShopCartById', () => {
    const rez = shopCartRequests.deleteShopCartById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllShopCarts', () => {
    const rez = shopCartRequests.deleteAllShopCarts();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('shopCartRequests methods throws errors ', () => {
  describe('getUserShopCart ', () => {
    it('throws an error when userId is not specified', () => {
      function testCheck () {
        shopCartRequests.getUserShopCart();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateShopCartById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        shopCartRequests.updateShopCartById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('createShopCart ', () => {
    it('throws an error when userId is not specified', () => {
      function testCheck () {
        shopCartRequests.createShopCart('', []);
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when products list is not specified', () => {
      function testCheck () {
        shopCartRequests.addSize('5eb302600b88a114a9daec58', []);
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateShopCartById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        shopCartRequests.updateShopCartById('');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('deleteShopCartById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        shopCartRequests.deleteShopCartById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
