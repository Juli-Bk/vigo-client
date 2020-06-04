import productRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, { path: '' });
});

afterEach(() => {
  Cookie.remove('token');
});

describe('productRequests has methods for all operations', () => {
  it('getAllProducts', () => {
    expect(productRequests).toHaveProperty('getAllProducts');
  });
  it('getProductById', () => {
    expect(productRequests).toHaveProperty('getProductById');
  });
  it('getProductsByFilters', () => {
    expect(productRequests).toHaveProperty('getProductsByFilters');
  });
  it('searchProducts', () => {
    expect(productRequests).toHaveProperty('searchProducts');
  });
  it('addNewProduct', () => {
    expect(productRequests).toHaveProperty('addNewProduct');
  });
  it('updateProductById', () => {
    expect(productRequests).toHaveProperty('updateProductById');
  });
  it('deleteProductById', () => {
    expect(productRequests).toHaveProperty('deleteProductById');
  });
  it('deleteAllProducts', () => {
    expect(productRequests).toHaveProperty('deleteAllProducts');
  });
});

describe('all productRequests methods return Promise', () => {
  it('getAllProducts', () => {
    const rez = productRequests.getAllProducts();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getProductById', () => {
    const rez = productRequests.getProductById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getProductsByFilters', () => {
    const rez = productRequests.getProductsByFilters();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('searchProducts', () => {
    const rez = productRequests.searchProducts('testSearch');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('addNewProduct', () => {
    const rez = productRequests.addNewProduct({});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updateProductById', () => {
    const rez = productRequests.updateProductById('5eb302600b88a114a9daec58', {});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteProductById', () => {
    const rez = productRequests.deleteProductById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllProducts', () => {
    const rez = productRequests.deleteAllProducts();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('productRequests methods throws errors ', () => {
  describe('searchProducts ', () => {
    it('throws an error when searchString is not specified', () => {
      function testCheck () {
        productRequests.searchProducts();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('addNewProduct ', () => {
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        productRequests.addNewProduct();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateProductById ', () => {
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        productRequests.updateProductById('5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
