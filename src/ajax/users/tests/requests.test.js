import userRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, { path: '' });
});

afterEach(() => {
  Cookie.remove('token');
});

describe('userRequests has methods for all operations', () => {
  it('getAllUsers', () => {
    expect(userRequests).toHaveProperty('getAllUsers');
  });
  it('getUser', () => {
    expect(userRequests).toHaveProperty('getUser');
  });
  it('createUser', () => {
    expect(userRequests).toHaveProperty('createUser');
  });
  it('updateUserInfoById', () => {
    expect(userRequests).toHaveProperty('updateUserInfoById');
  });
  it('updatePassword', () => {
    expect(userRequests).toHaveProperty('updatePassword');
  });
  it('deleteUserById', () => {
    expect(userRequests).toHaveProperty('deleteUserById');
  });
  it('deleteAllCustomers', () => {
    expect(userRequests).toHaveProperty('deleteAllCustomers');
  });
  it('login', () => {
    expect(userRequests).toHaveProperty('login');
  });
});

describe('all userRequests methods return Promise', () => {
  it('getAllUsers', () => {
    const rez = userRequests.getAllUsers(1, 15, '-firstName');
    expect(rez.constructor.name).toEqual('Promise');
  });

  it('getUser', () => {
    const rez = userRequests.getUser();
    expect(rez.constructor.name).toEqual('Promise');
  });

  it('createUser', () => {
    const rez = userRequests.createUser({
      login: 'er@fg.com',
      password: '12345678'
    });
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updateUserInfoById', () => {
    const rez = userRequests
      .updateUserInfoById('5eb302600b88a114a9daec58', {phoneNumber: '+380506860922'});
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('updatePassword', () => {
    const rez = userRequests.updatePassword('5eb302600b88a114a9daec58', {
      oldPassword: '380506860922',
      newPassword: '2436237'
    });
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteUserById', () => {
    const rez = userRequests.deleteUserById('5eb302600b88a114a9daec58');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllCustomers', () => {
    const rez = userRequests.deleteAllCustomers();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('login', () => {
    const rez = userRequests.login({
      login: 'er@fg.com',
      password: '12345678'
    });
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('userRequests methods throws errors ', () => {
  describe('deleteUserById ', () => {
    it('throws an error when token is not specified', () => {
      Cookie.remove('token');
      function testCheck () {
        userRequests.deleteUserById('5ebc2a44418dcb6fec27b9f7');
      }

      expect(testCheck).toThrowError(Error);
    });

    it('throws an error when id is not specified', () => {
      function testCheck () {
        userRequests.deleteUserById(null);
      }

      expect(testCheck).toThrowError(Error);
    });
  });

  describe('deleteAllCustomers ', () => {
    it('throws an error when token is not specified', () => {
      Cookie.remove('token');
      function testCheck () {
        userRequests.deleteAllCustomers();
      }

      expect(testCheck).toThrowError(Error);
    });
  });

  describe('createUser ', () => {
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        userRequests.createUser();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updateUserInfoById ', () => {
    it('throws an error when id is not specified', () => {
      function testCheck () {
        userRequests.updateProductById(null, {});
      }

      expect(testCheck).toThrowError(TypeError);
    });

    it('throws an error when token is not specified', () => {
      function testCheck () {
        userRequests.updateProductById('5ebc2a44418dcb6fec27b9f7', {});
      }

      expect(testCheck).toThrowError(TypeError);
    });

    it('throws an error when formData is not specified', () => {
      function testCheck () {
        userRequests.updateProductById('5ebc2a44418dcb6fec27b9f7');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('updatePassword ', () => {
    it('throws an error when id is not specified', () => {
      Cookie.remove('token');
      function testCheck () {
        userRequests.updatePassword(null, {});
      }

      expect(testCheck).toThrowError(Error);
    });

    it('throws an error when token is not specified', () => {
      Cookie.remove('token');
      function testCheck () {
        userRequests.updatePassword('5ebc2a44418dcb6fec27b9f7', {});
      }

      expect(testCheck).toThrowError(Error);
    });

    it('throws an error when formData is not specified', () => {
      function testCheck () {
        userRequests.updatePassword('5ebc2a44418dcb6fec27b9f7');
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('login ', () => {
    it('throws an error when formData is not specified', () => {
      function testCheck () {
        userRequests.login();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });
});
