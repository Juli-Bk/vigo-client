import quantityRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, {path: ''});
});

afterEach(() => {
  Cookie.remove('token');
});

describe('quantityRequests has methods for all operations', () => {
  it('getAllQuantity', () => {
    expect(quantityRequests).toHaveProperty('getAllQuantity');
  });
  it('getQuantityByProductId', () => {
    expect(quantityRequests).toHaveProperty('getQuantityByProductId');
  });
  it('addQuantity', () => {
    expect(quantityRequests).toHaveProperty('addQuantity');
  });
  it('updateQuantityById', () => {
    expect(quantityRequests).toHaveProperty('updateQuantityById');
  });
  it('deleteQuantityById', () => {
    expect(quantityRequests).toHaveProperty('deleteQuantityById');
  });
  it('deleteAllQuantities', () => {
    expect(quantityRequests).toHaveProperty('deleteAllQuantities');
  });
});

describe('all quantityRequests methods return Promise', () => {
  it('getAllQuantity', () => {
    const rez = quantityRequests.getAllQuantity();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getQuantityByProductId', () => {
    const rez = quantityRequests.getQuantityByProductId('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('addQuantity', () => {
    const rez = quantityRequests.addQuantity('5eb302600b88a114a9daec58', '5eb302600b88a114a9daec58', '5eb302600b88a114a9daec58', 10);
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updateQuantityById', () => {
    const rez = quantityRequests.updateQuantityById('5eb302600b88a114a9daec58', {});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteQuantityById', () => {
    const rez = quantityRequests.deleteQuantityById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllQuantities', () => {
    const rez = quantityRequests.deleteAllQuantities();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('quantityRequests methods throws errors ', () => {
  describe('getQuantityByProductId ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        quantityRequests.getQuantityByProductId();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateQuantityById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        quantityRequests.updateQuantityById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        quantityRequests.updateQuantityById('5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('addQuantity ', () => {
    it('throws an error when productId is not specified', () => {
      function testCheck () {
        quantityRequests.addQuantity('', '5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when colorId is not specified', () => {
      function testCheck () {
        quantityRequests.addQuantity('5eb302600b88a114a9daec58', '');
      }

      expect(testCheck).toThrowError(TypeError);
    });

    it('throws an error when sizeId is not specified', () => {
      function testCheck () {
        quantityRequests.addQuantity('5eb302600b88a114a9daec58', '5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });

    it('throws an error when quantity is not specified', () => {
      function testCheck () {
        quantityRequests.addQuantity('5eb302600b88a114a9daec58', '5eb302600b88a114a9daec58', '5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('deleteQuantityById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        quantityRequests.deleteQuantityById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
