import wishListRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, { path: '' });
});

afterEach(() => {
  Cookie.remove('token');
});

describe('wishListRequests has methods for all operations', () => {
  it('getAllWishListData', () => {
    expect(wishListRequests).toHaveProperty('getAllWishListData');
  });
  it('getUserWishList', () => {
    expect(wishListRequests).toHaveProperty('getUserWishList');
  });
  it('addProductToWishList', () => {
    expect(wishListRequests).toHaveProperty('addProductToWishList');
  });
  it('deleteProductFromWishlist', () => {
    expect(wishListRequests).toHaveProperty('deleteProductFromWishlist');
  });
  it('deleteAllWishes', () => {
    expect(wishListRequests).toHaveProperty('deleteAllWishes');
  });
});

describe('all wishListRequests methods return Promise', () => {
  it('getAllWishListData', () => {
    const rez = wishListRequests.getAllWishListData();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getUserWishList', () => {
    const rez = wishListRequests.getUserWishList('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('addProductToWishList', () => {
    const rez = wishListRequests.addProductToWishList('5eb302600b88a114a9daec58', '5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteProductFromWishlist', () => {
    const rez = wishListRequests.deleteProductFromWishlist('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllWishes', () => {
    const rez = wishListRequests.deleteAllWishes();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('wishListRequests methods throws errors ', () => {
  describe('getUserWishList ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        wishListRequests.getUserWishList();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('addProductToWishList ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        wishListRequests.addProductToWishList();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('deleteProductFromWishlist ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        wishListRequests.deleteProductFromWishlist();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
