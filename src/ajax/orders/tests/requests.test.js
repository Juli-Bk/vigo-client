import orderRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, {path: ''});
});

afterEach(() => {
  Cookie.remove('token');
});

describe('orderRequests has methods for all operations', () => {
  it('getAllOrders', () => {
    expect(orderRequests).toHaveProperty('getAllOrders');
  });
  it('getUserOrders', () => {
    expect(orderRequests).toHaveProperty('getUserOrders');
  });
  it('placeOrder', () => {
    expect(orderRequests).toHaveProperty('placeOrder');
  });
  it('deleteOrderById', () => {
    expect(orderRequests).toHaveProperty('deleteOrderById');
  });
  it('deleteAllOrders', () => {
    expect(orderRequests).toHaveProperty('deleteAllOrders');
  });
  it('updateOrderById', () => {
    expect(orderRequests).toHaveProperty('updateOrderById');
  });
  it('cancelOrder', () => {
    expect(orderRequests).toHaveProperty('cancelOrder');
  });
});

describe('all orderRequests methods return Promise', () => {
  it('getAllOrders', () => {
    const rez = orderRequests.getAllOrders();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('getUserOrders', () => {
    const rez = orderRequests.getUserOrders('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('placeOrder', () => {
    const rez = orderRequests.placeOrder('5eb302600b88a114a9daec58',
      [{productId: '5eb302600b88a114a9daec58'}], {});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updateOrderById', () => {
    const rez = orderRequests.updateOrderById('5eb302600b88a114a9daec58', {});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('cancelOrder', () => {
    const rez = orderRequests.cancelOrder('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteOrderById', () => {
    const rez = orderRequests.deleteOrderById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllOrders', () => {
    const rez = orderRequests.deleteAllOrders();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('orderRequests methods throws errors ', () => {
  describe('getUserOrders ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        orderRequests.getUserOrders();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('placeOrder ', () => {
    it('throws an error when id is specified but it is not Guid', () => {
      function testCheck () {
        orderRequests.placeOrder('some string');
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when product list is empty', () => {
      function testCheck () {
        orderRequests.placeOrder('5eb302600b88a114a9daec58', [], {});
      }

      expect(testCheck).toThrowError(Error);
    });
  });

  describe('deleteOrderById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        orderRequests.deleteOrderById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('cancelOrder ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        orderRequests.cancelOrder();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateOrderById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        orderRequests.updateOrderById();
      }

      expect(testCheck).toThrowError(TypeError);
    });
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        orderRequests.updateOrderById('5eb302600b88a114a9daec58');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
