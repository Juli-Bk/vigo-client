import subscribersRequests from '../requests';
import '@testing-library/jest-dom/extend-expect';
import Cookie from 'js-cookie';

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, { path: '' });
});

afterEach(() => {
  Cookie.remove('token');
});

describe('subscribersRequests has methods for all operations', () => {
  it('getAllSubscribers', () => {
    expect(subscribersRequests).toHaveProperty('getAllSubscribers');
  });
  it('subscribe', () => {
    expect(subscribersRequests).toHaveProperty('subscribe');
  });
  it('unsubscribe', () => {
    expect(subscribersRequests).toHaveProperty('unsubscribe');
  });
  it('deleteAllSubscribers', () => {
    expect(subscribersRequests).toHaveProperty('deleteAllSubscribers');
  });
});

describe('all subscribersRequests methods return Promise', () => {
  it('getAllSubscribers', () => {
    const rez = subscribersRequests.getAllSubscribers();
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('subscribe', () => {
    const rez = subscribersRequests.subscribe('email');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('unsubscribe', () => {
    const rez = subscribersRequests.unsubscribe('emil');
    expect(rez.constructor.name).toEqual('Promise');
  });
  it('deleteAllSubscribers', () => {
    const rez = subscribersRequests.deleteAllSubscribers();
    expect(rez.constructor.name).toEqual('Promise');
  });
});

describe('subscribersRequests methods throws errors ', () => {
  describe('getAllSubscribers ', () => {
    it('throws an error when token is not specified', () => {
      Cookie.remove('token');
      function testCheck () {
        subscribersRequests.getAllSubscribers();
      }

      expect(testCheck).toThrowError(Error);
    });
  });

  describe('subscribe ', () => {
    it('throws an error when email is not specified', () => {
      function testCheck () {
        subscribersRequests.subscribe();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('unsubscribe ', () => {
    it('throws an error when email is not specified', () => {
      function testCheck () {
        subscribersRequests.unsubscribe();
      }

      expect(testCheck).toThrowError(TypeError);
    });
  });

  describe('deleteAllSubscribers ', () => {
    it('throws an error when token is not specified', () => {
      Cookie.remove('token');
      function testCheck () {
        subscribersRequests.deleteAllSubscribers();
      }

      expect(testCheck).toThrowError(Error);
    });
  });
});
