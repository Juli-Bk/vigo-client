import {
  checkId,
  getAuthHeader,
  getFilterString,
  getJWTfromCookie,
  getQueryString,
  isGuid
} from '../helper';
import {mock} from './testHelper';
import Cookie from 'js-cookie';

mock();

describe('ajax helper isGuid tests', () => {
  it('return false if not Guid', () => {
    const result = isGuid('test');
    expect(result).toBe(false);
  });

  it('return true if Guid', () => {
    const result = isGuid('5eb302600b88a114a9daec58');
    expect(result).toBe(true);
  });
});

describe('ajax helper checkId tests', () => {
  it('throws an error if undefined', () => {
    expect(() => {
      checkId();
    }).toThrow();
  });

  it('throws an TypeError if not GUID', () => {
    function testCheck () {
      checkId('test');
    }

    expect(testCheck).toThrowError(TypeError);
  });
});

describe('ajax helper getAuthHeader tests', () => {
  it('throws an error if token is undefined', () => {
    expect(() => {
      getAuthHeader();
    }).toThrow();
  });

  it('returns an request Header if token specified in cookie', () => {
    const token = 'token';
    Cookie.set('token', token, { path: '' });
    const header = getAuthHeader();
    expect(header.constructor.name).toEqual('Headers');
    expect(header.get('Authorization')).toEqual(token);
    expect(header.get('Content-Type')).toEqual('application/json');
  });
});

describe('ajax helper getJWTfromCookie tests', () => {
  it('gets token from cookie', () => {
    const token = 'example_token';
    Cookie.set('token', token, { path: '' });
    expect(getJWTfromCookie()).toEqual(token);
  });
});

describe('ajax helper getQueryString tests', () => {
  it('returns empty string if no filters specified', () => {
    const queryString = getQueryString();
    expect(queryString).toEqual('');
  });
  it('returns expected string if sort specified', () => {
    const queryString = getQueryString({sort: '-name'});
    expect(queryString).toEqual('sort=-name');
  });
  it('returns expected string if only perPage specified', () => {
    const queryString = getQueryString({perPage: 3});
    expect(queryString).toEqual('');
  });
  it('returns expected string if only startPage specified', () => {
    const queryString = getQueryString({startPage: 3});
    expect(queryString).toEqual('');
  });
  it('returns expected string if startPage AND perPage specified', () => {
    const queryString = getQueryString({
      startPage: 0,
      perPage: 3
    });
    expect(queryString).toEqual('startPage=0&perPage=3');
  });
  it('returns expected string if all params are specified', () => {
    const queryString = getQueryString({
      startPage: 0,
      perPage: 3,
      sort: '-name'
    });
    expect(queryString).toEqual('startPage=0&perPage=3&sort=-name');
  });
});

describe('ajax helper getFilterString tests', () => {
  it('returns empty string if no filters specified', () => {
    const queryString = getFilterString();
    expect(queryString).toEqual('');
  });

  it('returns expected string if all params are specified', () => {
    const filters = [
      {minPrice: 100},
      {maxPrice: 200},
      {name: 'dress,pants,shirt'},
      {color: 'green'}
    ];
    const queryString = getFilterString(filters, {
      startPage: 0,
      perPage: 3,
      sort: '-name'
    });
    expect(queryString).toEqual('minPrice=100&maxPrice=200&name=dress,pants,shirt&color=green&startPage=0&perPage=3&sort=-name');
  });
});
